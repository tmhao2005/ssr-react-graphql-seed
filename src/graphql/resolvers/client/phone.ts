import { User } from "../../../generated/graphql";

export function setPhone(
  root: Omit<User, 'phoneCustom'>
) {
  return root.phone;
}
