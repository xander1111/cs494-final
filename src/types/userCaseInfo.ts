export type UserCaseInfo = {
    user_uuid: string,
    case_id: number,
    buffer: string,
    target_a: string,
    target_b?: string,
    type: string,
    category: string,
    learned: boolean,
    algorithm: string,
    user_alg_id?: number,
    alg_id?: number,
}
