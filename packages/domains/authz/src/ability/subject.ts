import { subject as caslSubject } from "@casl/ability";

import type { SubjectType } from "../model/subject-type";

export const subject = caslSubject as <T extends object>(type: SubjectType, value: T) => T;
