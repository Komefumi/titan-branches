interface IDataAsList extends Array<string> {}

export default [
  ...Array(4).fill([
    "Dummy Title",
    "Dummy Paragraph",
    "Dummy Paragraph",
    "Dummy Paragraph",
    "Dummy Paragraph",
  ]),
] as IDataAsList[];
