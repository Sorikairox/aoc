// import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const seedRegex = /(?:seeds:)\s*((?:\d+\s+)+\d+)/g;
const seedToSoilRegex = /(?:seed-to-soil map:)\s*((?:\d+\s+)+\d+)/g;
const soilToFertilizerRegex = /(?:soil-to-fertilizer map:)\s*((?:\d+\s+)+\d+)/g;
const fertilizerToWaterRegex = /(?:fertilizer-to-water map:)\s*((?:\d+\s+)+\d+)/g;
const waterToLightRegex = /(?:water-to-light map:)\s*((?:\d+\s+)+\d+)/g;
const lightToTempRegex = /(?:light-to-temperature map:)\s*((?:\d+\s+)+\d+)/g;
const tempToHumidityRegex = /(?:temperature-to-humidity map:)\s*((?:\d+\s+)+\d+)/g;
const humidityToLocationRegex = /(?:humidity-to-location map:)\s*((?:\d+\s+)+\d+)/g;

function getSeed(input: string) {
  const match = seedRegex.exec(input);
  return match?.[1].split('\n').filter(s => s !== '').map(s => s.split(' ').map(Number)).flat();
}

function getCoordinateMapping(input: string, regex: RegExp) {
  const match = regex.exec(input);
  const coordinateSystems = match?.[1].split('\n').filter(s => s !== '').map(s => s.split(' ').filter(s => s !== '').map(Number));
  const mapping: Array<{destination: number, source: number, treshold: number}> = [];

  coordinateSystems?.forEach(system => {
    mapping.push({
      destination: system[0], source: system[1], treshold: system[2],
    })
  })
  return mapping;
}

function getCoordinate(mapping:  Array<{destination: number, source: number, treshold: number}>, source: number) {
  for (const system of mapping) {
    if (source >= (system.source) && source < (system.source + system.treshold)) {
      return (source - system.source) + system.destination;
    }
  }
  return source;
}

export const step02 = (input: string): number => {
  
const seeds = getSeed(input);
const seedToSoilMapping = getCoordinateMapping(input, seedToSoilRegex);
const soilToFertilizer = getCoordinateMapping(input, soilToFertilizerRegex);
const fertilizerToWater = getCoordinateMapping(input, fertilizerToWaterRegex);
const waterToLight = getCoordinateMapping(input, waterToLightRegex);
const lightToTemp = getCoordinateMapping(input, lightToTempRegex);
const tempToHumidity = getCoordinateMapping(input, tempToHumidityRegex);
const humidityToLocation = getCoordinateMapping(input, humidityToLocationRegex);
let minimalPosition = +Infinity;

if (seeds) {
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const length = seeds[i + 1];
  
    for (let j = 0;j < length;j++) {
    const seed = start + j;
    const soil = getCoordinate(seedToSoilMapping, seed);
    const fertilizer = getCoordinate(soilToFertilizer, soil);
    const water = getCoordinate(fertilizerToWater, fertilizer);
    const light = getCoordinate(waterToLight, water);
    const temp = getCoordinate(lightToTemp, light);
    const humidity = getCoordinate(tempToHumidity, temp);
    const location = getCoordinate(humidityToLocation, humidity);

    if (location < minimalPosition)
    minimalPosition = location;
    }
  }
}
  return minimalPosition;
}

console.log(step02(input));