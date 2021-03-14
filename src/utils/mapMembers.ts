import { Members } from '../interfaces';

const mapMembers = (members: Members[]) => members.map(({ name }: Members) => name);

export default mapMembers;
