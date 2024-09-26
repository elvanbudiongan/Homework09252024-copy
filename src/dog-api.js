"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breed = void 0;
exports.fetchFacts = fetchFacts;
exports.dogBreeds = dogBreeds;
exports.fetchBreedGroups = fetchBreedGroups;
//1
function fetchFacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://dogapi.dog/api/v2/facts')
                .then(r => r.json());
            const id = response.data[0].id;
            const type = response.data[0].type;
            const fact = response.data[0].attributes.body;
            const result = {
                type: type,
                id: id,
                body: fact
            };
            console.log(result);
            return result;
        }
        catch (error) {
            console.error('Error fetching random dog facts:', error);
        }
    });
}
class Breed {
    constructor(type, id, name, description, life, male_weight, female_weight) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.description = description;
        this.life = life;
        this.male_weight = male_weight;
        this.female_weight = female_weight;
    }
}
exports.Breed = Breed;
//2
function dogBreeds() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://dogapi.dog/api/v2/breeds")
                .then(r => r.json());
            const breeds = response;
            const breedList = [];
            for (let i = 0; i < breeds.data.length; i++) {
                const id = breeds.data[i].id;
                const type = breeds.data[i].type;
                const name = breeds.data[i].attributes.name;
                const description = breeds.data[i].attributes.description;
                const life = breeds.data[i].attributes.life;
                const male_weight = breeds.data[i].attributes.male_weight;
                const female_weight = breeds.data[i].attributes.female_weight;
                breedList.push(new Breed(type, id, name, description, life, male_weight, female_weight));
            }
            console.log(breedList);
            return breedList;
        }
        catch (err) {
            console.log(err);
        }
    });
}
//3
function fetchBreedGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const breeds = yield dogBreeds();
            if (!breeds)
                return;
            const groupsResponse = yield fetch("https://dogapi.dog/api/v2/groups").then((r) => r.json());
            const groups = groupsResponse.data;
            const breedGroups = groups.map((group) => {
                const groupBreedIds = group.relationships.breeds.data.map((breed) => breed.id);
                const groupBreeds = breeds.filter((breed) => groupBreedIds.includes(breed.id));
                return groupBreeds;
            });
            console.log(breedGroups);
            return breedGroups;
        }
        catch (err) {
            console.log("Error fetching breed groups:", err);
        }
    });
}
