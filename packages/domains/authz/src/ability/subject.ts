import { subject as caslSubject } from "@casl/ability";

import type { SubjectType } from "../model/subject-type";

// Tags a value with its SubjectType for CASL's runtime subject detection, typed
// as SubjectType — the form `ability.can()` and `<Can a={...}>` accept when the
// ability uses string subject types. The returned value still carries
// `__caslSubjectType__` at runtime, so condition matching (status, customerId,
// ...) runs against the instance.
export function subject<T extends object>(type: SubjectType, value: T): SubjectType {
  return caslSubject(type, value as T & Record<PropertyKey, unknown>) as unknown as SubjectType;
}
