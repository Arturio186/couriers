export default interface IBranchStaff {
    branch_id: string;
    user_id: string;
    user_first_name?: string;
    user_last_name?: string;
    user_email?: string;
    user_role?: string;
    branch_name?: string;
    business_id?: string;
    business_name?: string;
    city_coords?: string;
}