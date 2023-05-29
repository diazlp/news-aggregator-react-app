export default class Utils {
  static capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static getUniqueCategories(newCategories, existingCategories) {
    const combinedCategories = [...newCategories, ...existingCategories];
    const uniqueCategories = combinedCategories.filter((obj, index, self) =>
      index === self.findIndex((item) => item.value === obj.value)
    );
    return uniqueCategories;
  }

  static getDefaultSearchDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = d.getDate().toString().padStart(2, '0');
    const monthAgoDate = `${year}-${month - 1}-${day}`;
    const todaysDate = `${year}-${month}-${day}`;

    return { monthAgoDate, todaysDate }
  }

  static getFormattedDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
  }
}