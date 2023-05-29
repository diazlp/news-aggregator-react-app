export default class Utils {
  static getDefaultDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = d.getDate().toString().padStart(2, '0');
    const monthAgoDate = `${year}-${month - 1}-${day}`;
    const todaysDate = `${year}-${month}-${day}`;

    return { monthAgoDate, todaysDate }
  }
}