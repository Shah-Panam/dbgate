import { splitQuery } from './splitQuery';

test('simple query', () => {
  const output = splitQuery('select * from A');
  expect(output).toEqual(['select * from A']);
});

test('correct split 2 queries', () => {
  const output = splitQuery('SELECT * FROM `table1`;SELECT * FROM `table2`;');
  expect(output).toEqual(['SELECT * FROM `table1`', 'SELECT * FROM `table2`']);
});

test('correct split 2 queries - no end semicolon', () => {
  const output = splitQuery('SELECT * FROM `table1`;SELECT * FROM `table2`');
  expect(output).toEqual(['SELECT * FROM `table1`', 'SELECT * FROM `table2`']);
});

test('delete empty query', () => {
  const output = splitQuery(';;;\n;;SELECT * FROM `table1`;;;;;SELECT * FROM `table2`;;; ;;;');
  expect(output).toEqual(['SELECT * FROM `table1`', 'SELECT * FROM `table2`']);
});

test('should handle double backtick', () => {
  const input = ['CREATE TABLE `a``b` (`c"d` INT)', 'CREATE TABLE `a````b` (`c"d` INT)'];
  const output = splitQuery(input.join(';\n') + ';');
  expect(output).toEqual(input);
});

test('semicolon inside string', () => {
  const input = ['CREATE TABLE [a1]', "INSERT INTO [a1] (x) VALUES ('1;2;3;4')"];
  const output = splitQuery(input.join(';\n') + ';');
  expect(output).toEqual(input);
});
