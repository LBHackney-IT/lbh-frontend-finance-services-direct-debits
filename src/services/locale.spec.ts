import locale from "./locale";

describe("locale", () => {
  describe("personTitleAbbr", () => {
    it("should add a dot if a title is known", () => {
      ["Dr", "Mr", "Mrs", "Ms"].forEach((title) =>
        expect(locale.person.personTitleAbbr(title)).toBe(`${title}.`)
      );
    });
    it("should return the title if its not known", () => {
      const NOT_KNOWN_TITLE = "NotKnown";
      expect(locale.person.personTitleAbbr(NOT_KNOWN_TITLE)).toBe(
        NOT_KNOWN_TITLE
      );
    });
  });
  describe("person tenureType", () => {
    it("should return ExampleType", () => {
      expect(locale.person.tenureType("ExampleType")).toBe("ExampleType");
    });
    it("should return N/A if empty string is passed", () => {
      expect(locale.person.tenureType("")).toBe("N/A");
    });
    it("should return N/A if null is passed", () => {
      expect(locale.person.tenureType(null)).toBe("N/A");
    });
  });
  describe("asset type", () => {
    it("should return Dwelling if Dwelling is sent", () => {
      expect(locale.asset.assetType("Dwelling")).toBe("Dwelling");
    });
    it("should otherwise return Lettable non-dwelling", () => {
      expect(locale.asset.assetType("Dwellingg")).toBe("Lettable non-dwelling");
    });
  });
  describe("tenure activity status", () => {
    it("should return Active if isActive is true", () => {
      expect(locale.asset.tenureActivityStatus(true)).toBe("Active");
    });
    it("should return Inactive otherwise", () => {
      expect(locale.asset.tenureActivityStatus(false)).toBe("Inactive");
    });
  });
});
