export default interface PostalCodeRecord extends Record<string,any> {
    code: string,
    city: string,
    street: string,
    company: string | null
}
