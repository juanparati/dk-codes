import { expect }              from 'chai';
import PostalCodeSearchService from "../src/services/PostalCodeSearchService";
import PostalCodeRecord        from "../src/types/PostalCodeRecord";

const codes : PostalCodeRecord[] = require('../src/assets/codes.json');

describe('Find by code', () => {
    it('should be able to find by postal code', () => {

        const result = new PostalCodeSearchService(codes).searchByCode('8240');

        expect(result)
            .to.be.an('array')
            .that.has.at.length(1);

        expect(result[0])
            .to.be.eql({code:"8240", city:"Risskov",street:"",company:""})
    });
});
