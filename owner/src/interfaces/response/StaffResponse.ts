import IStaff from "#interfaces/IStaff";

export default interface StaffResponse {
    staff: IStaff[];
    maxPage: number;
}