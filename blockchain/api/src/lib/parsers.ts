import { booleanParser, bsonObjectIdStringParser, dateParser, integerParser, stringParser } from '@rawmodel/parsers';
import { ObjectId } from 'mongodb';
import { ngram, tokenize } from 'ngramable';

/**
 * Converts a value to MongoDB ID or returns null.
 * @param value String value.
 */
export function toObjectId(value: any) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}

/**
 * Transform the provided string into n-gramified string.
 * @param value String value.
 */
export function toNgrams(value: string) {
  if (!value) {
    return null;
  }

  return tokenize(value)
    .map((t) => ngram(t, { min: 3, max: 15, style: 1 }))
    .reduce((a, b) => a.concat(b), [])
    .map((t) => t.toLowerCase())
    .join(' ');
}

/**
 * Expose standard parsers.
 */
export {
  stringParser,
  booleanParser,
  dateParser,
  integerParser,
  bsonObjectIdStringParser,
};

/**
 * Parses a value to MongoDB ID or returns null.
 * @param value String value.
 */
export function bsonObjectIdParser(value: any) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}
