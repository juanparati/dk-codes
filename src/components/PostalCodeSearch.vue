<template>
  <div>
    <div class="field-groups">
      <div class="field-group">
        <label for="tbxCode">Postal code</label>
        <input id="tbxCode" type="text" v-model="codeValue" />
      </div>

      <div class="field-group">
        <label for="tbxCity">City</label>
        <input id="tbxCity" type="text" v-model="cityValue" />
      </div>

      <div class="field-group">
        <label for="tbxStreet">Street</label>
        <input id="tbxStreet" type="text" v-model="streetValue" />
      </div>

      <div class="field-group">
        <label for="tbxCompany">Company</label>
        <input id="tbxCompany" type="text" v-model="companyValue" />
      </div>

      <div class="field-group">
        <label for="tbxCompany">Only first match</label>
        <input type="checkbox" v-model="showOnlyFirst" />

      </div>
    </div>

    <div class="results">

      <div v-show="!result" class="not-result">
        Postal code records not found!
      </div>

      <table v-show="result">
        <thead>
          <tr>
            <th>Code</th>
            <th>City</th>
            <th>Street</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in result">
            <td>{{ record.code }}</td>
            <td>{{ record.city }}</td>
            <td>{{ record.street }}</td>
            <td>{{ record.company }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component}        from 'vue-property-decorator';
import PostalCodeSearchService from "@/services/PostalCodeSearchService";
import PostalCodeRecord        from "@/types/PostalCodeRecord";

const records : PostalCodeRecord[] = require('../assets/codes.json');

@Component
export default class PostalCodeSearch extends Vue {

  // Mutable properties
  // ==================
  protected codes         : PostalCodeRecord[] = records
  protected showOnlyFirst : boolean = false;

  protected codeValue    : string  = '';
  protected cityValue    : string  = '';
  protected streetValue  : string  = '';
  protected companyValue : string  = '';



  // Computed properties
  // ===================
  get filteredByCode() {
    if (this.codeValue)
      return new PostalCodeSearchService(this.codes).searchByCode(this.codeValue);

    return this.codes;
  }

  get filteredByCity() {
    if (this.cityValue)
      return new PostalCodeSearchService(this.filteredByCode).searchByCity(this.cityValue);

    return this.filteredByCode;
  }

  get filteredByStreet() {
    if (this.streetValue)
      return new PostalCodeSearchService(this.filteredByCity).searchByStreet(this.streetValue);

    return this.filteredByCity;
  }

  get filteredByCompany() {
    if (this.companyValue)
      return new PostalCodeSearchService(this.filteredByStreet).searchByCompany(this.companyValue);

    return this.filteredByStreet;
  }

  get result() {

    if (!this.codeValue && !this.cityValue && !this.streetValue && !this.companyValue)
      return null;

    if (this.filteredByCompany.length === 0)
      return null

    if (this.showOnlyFirst)
      return [this.filteredByCompany[0]];

    return this.filteredByCompany;
  }

}
</script>

<style scoped>

.field-groups {
  text-align: center;
}

.field-group {
  margin-bottom: 10px;
  font-size: 16px;
}

.field-group label {
  display: inline-flex;
  width: 120px;
  text-align: right;
}

.field-group input[type=text] {
  font-size: 14px;
}

.results {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.not-result {
  color: #5b0c0c;
}


table {
  background: white;
  border-radius:3px;
  border-collapse: collapse;
  margin: auto;
  max-width: 800px;
  padding:5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: float 5s infinite;
}

th {
  color:#D5DDE5;;
  background:#1b1e24;
  border-bottom:4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size:20px;
  font-weight: 100;
  padding:18px;
  text-align:left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align:middle;
}

th:first-child {
  border-top-left-radius:3px;
}

th:last-child {
  border-top-right-radius:3px;
  border-right:none;
}

tr {
  border-top: 1px solid #C1C3D1;
  border-bottom-: 1px solid #C1C3D1;
  color:#666B85;
  font-size:16px;
  font-weight:normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}

tr:hover td {
  background:#4E5066;
  color:#FFFFFF;
  border-top: 1px solid #22262e;
}

tr:first-child {
  border-top:none;
}

tr:last-child {
  border-bottom:none;
}

tr:nth-child(odd) td {
  background:#EBEBEB;
}

tr:nth-child(odd):hover td {
  background:#4E5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius:3px;
}

tr:last-child td:last-child {
  border-bottom-right-radius:3px;
}

td {
  background:#FFFFFF;
  padding:18px;
  text-align:left;
  vertical-align:middle;
  font-weight:300;
  font-size:18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #C1C3D1;
}

td:last-child {
  border-right: 0px;
}

th.text-left {
  text-align: left;
}

th.text-center {
  text-align: center;
}

th.text-right {
  text-align: right;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}
</style>
