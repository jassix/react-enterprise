import { faker } from "@faker-js/faker";
import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { skillsCheck } from "~/application/checks/skills";
import { runCheck } from "~/application/usecases/doctor/run-checks";
import type { CheckResult } from "~/domain/doctor/check";
import {
  buildSkillsLock,
  cleanupRoots,
  installSkillSymlink,
  makeCheckContext,
  makeDir,
  makeScopedRoot,
  makeSymlink,
  materializeSkill,
  writeJson,
  writeText,
} from "@tests/unit/fixtures";

const originalPath = process.env.PATH;

function findByName(results: CheckResult[], name: string): CheckResult | undefined {
  return results.find((r) => r.name === name);
}

function randomSkillNames(count: number): string[] {
  const names = new Set<string>();
  while (names.size < count) {
    names.add(`${faker.word.adjective()}-${faker.string.alphanumeric(6)}`);
  }
  return [...names];
}

describe("skillsCheck", () => {
  const roots: string[] = [];

  beforeEach(() => {
    roots.length = 0;
    process.env.PATH = "/bin:/usr/bin";
  });

  afterEach(async () => {
    process.env.PATH = originalPath;
    await cleanupRoots(roots);
  });

  describe("skills CLI", () => {
    test("fails when skills binary is not on PATH", async () => {
      const root = await makeScopedRoot(roots);
      await writeJson(root, "skills-lock.json", buildSkillsLock(["alpha"]));
      await materializeSkill(root, "alpha");
      await installSkillSymlink(root, "alpha");

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const cli = findByName(results, "skills CLI");
      expect(cli?.status).toBe("fail");
      if (cli?.status === "fail") {
        expect(cli.fix).toContain("skills.sh");
      }
    });
  });

  describe("skills-lock.json", () => {
    test("fails when skills-lock.json is missing", async () => {
      const root = await makeScopedRoot(roots);

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const lockResult = findByName(results, "skills-lock.json");
      expect(lockResult?.status).toBe("fail");
      if (lockResult?.status === "fail") {
        expect(lockResult.detail).toContain("missing");
      }
      expect(findByName(results, "downloaded")).toBeUndefined();
      expect(findByName(results, "symlinks")).toBeUndefined();
    });

    test("fails on an invalid skills-lock schema", async () => {
      const root = await makeScopedRoot(roots);
      await writeJson(root, "skills-lock.json", { version: 2 });

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const lockResult = findByName(results, "skills-lock.json");
      expect(lockResult?.status).toBe("fail");
    });

    test("ok with a count when the schema is valid", async () => {
      const root = await makeScopedRoot(roots);
      const names = randomSkillNames(3);
      await writeJson(root, "skills-lock.json", buildSkillsLock(names));
      for (const name of names) {
        await materializeSkill(root, name);
        await installSkillSymlink(root, name);
      }

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const lockResult = findByName(results, "skills-lock.json");
      expect(lockResult?.status).toBe("ok");
      if (lockResult?.status === "ok") {
        expect(lockResult.detail).toContain(`${names.length} skills`);
      }
    });
  });

  describe("materialized skills in .agents/skills/", () => {
    test("ok when every locked skill is materialized and symlinked", async () => {
      const root = await makeScopedRoot(roots);
      const names = randomSkillNames(2);
      await writeJson(root, "skills-lock.json", buildSkillsLock(names));
      for (const name of names) {
        await materializeSkill(root, name);
        await installSkillSymlink(root, name);
      }

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      expect(findByName(results, "downloaded")?.status).toBe("ok");
      expect(findByName(results, "symlinks")?.status).toBe("ok");
    });

    test("warns and lists the missing skill when one is not materialized", async () => {
      const root = await makeScopedRoot(roots);
      const [present, absent] = randomSkillNames(2) as [string, string];
      await writeJson(root, "skills-lock.json", buildSkillsLock([present, absent]));
      await materializeSkill(root, present);

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const downloaded = findByName(results, "downloaded");
      expect(downloaded?.status).toBe("warn");
      if (downloaded?.status === "warn") {
        expect(downloaded.detail).toContain(absent);
        expect(downloaded.detail).not.toContain(present);
      }
    });
  });

  describe("symlinks in .claude/skills/", () => {
    test("warns when symlinks are missing entirely", async () => {
      const root = await makeScopedRoot(roots);
      const names = randomSkillNames(2);
      await writeJson(root, "skills-lock.json", buildSkillsLock(names));
      for (const name of names) await materializeSkill(root, name);

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const symlinks = findByName(results, "symlinks");
      expect(symlinks?.status).toBe("warn");
      if (symlinks?.status === "warn") {
        expect(symlinks.detail).toContain("broken symlink");
      }
    });

    test("warns when a symlink resolves outside .agents/skills/", async () => {
      const root = await makeScopedRoot(roots);
      const [name] = randomSkillNames(1) as [string];
      await writeJson(root, "skills-lock.json", buildSkillsLock([name]));
      await materializeSkill(root, name);
      await makeDir(root, "elsewhere");
      await writeText(root, `elsewhere/${name}/SKILL.md`, `# ${name}\n`);
      await makeDir(root, ".claude/skills");
      await makeSymlink(root, `.claude/skills/${name}`, `../../elsewhere/${name}`);

      const results = await runCheck(skillsCheck, makeCheckContext(root));

      const symlinks = findByName(results, "symlinks");
      expect(symlinks?.status).toBe("warn");
      if (symlinks?.status === "warn") {
        expect(symlinks.detail).toContain(name);
      }
    });
  });
});
