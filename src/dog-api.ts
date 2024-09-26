export type fact = string
export type Fact = {
  type: fact;
  id: string;
  body: string;
};


//1
export async function fetchFacts():Promise<Fact|void> {
  try {
    const response:any = await fetch('https://dogapi.dog/api/v2/facts')
    .then(r=>r.json())
    const id:string = response.data[0].id
    const type:string = response.data[0].type
    const fact:string = response.data[0].attributes.body
    const result = {
      type:type,
      id:id,
      body:fact
    }
    console.log(result)
    return  result

  } catch (error:unknown) {
    console.error('Error fetching random dog facts:', error);
  }
}



export type Life = {
  min:number
  max:number
}

export type Weight = Life

export class Breed{
  type:fact
  life:Life
  male_weight:Weight
  female_weight:Weight
  id
  name
  description
  constructor(
    type:fact,
    id:string,
    name:string,
    description:string,
    life:Life,
    male_weight:Weight,
    female_weight:Weight

  ){
    this.type = type
    this.id = id
    this.name = name
    this.description = description
    this.life = life
    this.male_weight = male_weight
    this.female_weight = female_weight

  }
}

//2
export async function dogBreeds():Promise<Breed[] | void>{
  try{
    const response = await fetch("https://dogapi.dog/api/v2/breeds")
    .then(r=>r.json())
    const breeds = response
    const breedList = []
    for(let i = 0 ; i < breeds.data.length ; i ++){
      const id = breeds.data[i].id
      const type = breeds.data[i].type

      const name = breeds.data[i].attributes.name
      const description = breeds.data[i].attributes.description
      const life = breeds.data[i].attributes.life
      const male_weight = breeds.data[i].attributes.male_weight
      const female_weight = breeds.data[i].attributes.female_weight
      breedList.push(new Breed(type,id,name,description,life,male_weight,female_weight))
    }
    console.log(breedList)
    return breedList
  }catch(err:unknown){
    console.log(err)
  }
}

//3
export async function fetchBreedGroups(): Promise<Breed[][] | void> {
  try {
        const breeds = await dogBreeds();
    if (!breeds) return;

        const groupsResponse = await fetch("https://dogapi.dog/api/v2/groups").then(
      (r) => r.json()
    );
    const groups = groupsResponse.data;

        const breedGroups: Breed[][] = groups.map((group: any) => {
      const groupBreedIds = group.relationships.breeds.data.map((breed: any) => breed.id);
            const groupBreeds = breeds.filter((breed) => groupBreedIds.includes(breed.id));
      return groupBreeds;
    });

    console.log(breedGroups);     return breedGroups;
  } catch (err: unknown) {
    console.log("Error fetching breed groups:", err);
  }
}

