import PostalCodeRecord from "@/types/PostalCodeRecord";

/**
 * Service that search postal code records.
 */
export default class PostalCodeSearchService {

    /**
     * Injected list of postal code records.
     *
     * @protected
     */
    protected codes : PostalCodeRecord[];


    /**
     * Constructor.
     *
     * @param codes
     */
    constructor(codes : PostalCodeRecord[]) {
        this.codes = codes;
    }


    /**
     * Search a postal code record by code.
     *
     * @param code
     */
    public searchByCode(code : string) : PostalCodeRecord[] {
        return this.codes
            .filter(current => current.code.startsWith(code));
    }


    /**
     * Search a postal code record by city name.
     *
     * @param city
     */
    public searchByCity(city : string) : PostalCodeRecord[] {
        return this.searchLike('city', city);
    }


    /**
     * Search a postal code record by a street name.
     *
     * @param street
     */
    public searchByStreet(street : string) : PostalCodeRecord[] {
        return this.searchLike('street', street);
    }


    /**
     * Search a postal code record owned by a company.
     *
     * @param company
     */
    public searchByCompany(company : string) : PostalCodeRecord[] {
        return this.searchLike('company', company);
    }


    /**
     * Search "like" by field.
     *
     * @param field
     * @param value
     * @protected
     */
    protected searchLike(field : keyof PostalCodeRecord, value : string) : PostalCodeRecord[] {
        return this.codes
            .filter(current => current[field] && current[field].toLowerCase().includes(value.toLowerCase()));
    }

}
