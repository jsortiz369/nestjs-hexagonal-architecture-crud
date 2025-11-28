import {
  FiledSearchType,
  MatchModeBooleanType,
  MatchModeDateType,
  MatchModeEnumType,
  MatchModeNumberType,
  MatchModeStringType,
} from 'src/shared/domain/interfaces';

type FilterEnum = { [x: string]: string } | { [x: string]: { not: string } } | { [x: string]: { in: string[] } };
type FilterString =
  | { [x: string]: string }
  | { [x: string]: { contains: string } }
  | { [x: string]: { startsWith: string } }
  | { [x: string]: { endsWith: string } }
  | { [x: string]: { not: string } }
  | { [x: string]: { not: { contains: string } } }
  | { [x: string]: { in: string[] } };

type FilterDate =
  | { [x: string]: Date }
  | { [x: string]: { lt: Date } }
  | { [x: string]: { gt: Date } }
  | { [x: string]: { lte: Date } }
  | { [x: string]: { gte: Date } }
  | { [x: string]: { not: Date } }
  | { [x: string]: { gt: Date; lt: Date } }
  | { [x: string]: { gte: Date; lte: Date } }
  | { [x: string]: { in: Date[] } };

export class PrismaUtils {
  static searchFilter(field: FiledSearchType, value: string) {
    if (field.type === 'enum') return this.filterEnum(field, MatchModeEnumType.EQUALS, value);
    if (field.type === 'string') return this.filterString(field, MatchModeStringType.EQUALS, value);
    if (field.type === 'Date') return this.filterDate(field, MatchModeDateType.LTE_GTE, value);
    //if (field.type === 'number') return this.filterNumber(field, value, MatchModeNumberType.EQUALS);
    return null;
  }

  /**
   * @description Validate filter string value
   * @date 2025-11-24 06:47:56
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {FiledSearchType} field
   * @param {string} value
   * @param {MatchModeStringType} matchMode
   * @returns {(FilterString | null)}
   */
  private static filterString(field: FiledSearchType, matchMode: MatchModeStringType, value: string): FilterString | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    if (matchMode === MatchModeStringType.EQUALS) return { [field.field]: fieldValue };
    if (matchMode === MatchModeStringType.CONTAINS) return { [field.field]: { contains: fieldValue } };
    if (matchMode === MatchModeStringType.STARTS_WITH) return { [field.field]: { startsWith: fieldValue } };
    if (matchMode === MatchModeStringType.ENDS_WITH) return { [field.field]: { endsWith: fieldValue } };
    if (matchMode === MatchModeStringType.NOT_CONTAINS) return { [field.field]: { not: { contains: fieldValue } } };
    if (matchMode === MatchModeStringType.NOT_EQUALS) return { [field.field]: { not: fieldValue } };
    if (matchMode === MatchModeStringType.IN) return { [field.field]: { in: fieldValue.split(',') } };

    return null;
  }

  /**
   * @description Validate filters enum value
   * @date 2025-11-24 06:43:02
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {FiledSearchType} field
   * @param {string} value
   * @param {MatchModeEnumType} matchMode
   * @returns {(FilterEnum | null)}
   */
  private static filterEnum(field: FiledSearchType, matchMode: MatchModeEnumType, value: string): FilterEnum | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    if (matchMode === MatchModeEnumType.NOT_EQUALS) return { [field.field]: { not: fieldValue } };
    if (matchMode === MatchModeEnumType.EQUALS) return { [field.field]: fieldValue };
    if (matchMode === MatchModeEnumType.IN) return { [field.field]: { in: fieldValue.split(',') } };
    return null;
  }

  /**
   * @description Validate filters Date value
   * @date 2025-11-28 07:06:47
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {FiledSearchType} field
   * @param {MatchModeDateType} matchMode
   * @param {string} value
   * @returns {(FilterDate | null)}
   */
  private static filterDate(field: FiledSearchType, matchMode: MatchModeDateType, value: string): FilterDate | null {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    const dates = fieldValue.split(',');
    const deteValidate = this.validDataSearch(dates[0], true);
    if (deteValidate === null) return null;
    if (matchMode === MatchModeDateType.EQUALS) return { [field.field]: deteValidate };
    if (matchMode === MatchModeDateType.LT) return { [field.field]: { lt: deteValidate } };
    if (matchMode === MatchModeDateType.GT) return { [field.field]: { gt: deteValidate } };
    if (matchMode === MatchModeDateType.LTE) return { [field.field]: { lte: deteValidate } };
    if (matchMode === MatchModeDateType.GTE) return { [field.field]: { gte: deteValidate } };
    if (matchMode === MatchModeDateType.NOT_EQUALS) return { [field.field]: { not: deteValidate } };

    const dateEndValidate = this.validDataSearch(dates[1] || dates[0]);
    if (dateEndValidate === null) return null;
    if (matchMode === MatchModeDateType.LT_GT) return { [field.field]: { gt: deteValidate, lt: dateEndValidate } };
    if (matchMode === MatchModeDateType.LTE_GTE) return { [field.field]: { gte: deteValidate, lte: dateEndValidate } };

    const inDateValidate = dates.map((date) => this.validDataSearch(date, true)).filter((date) => date !== null);
    if (matchMode === MatchModeDateType.IN) return { [field.field]: { in: inDateValidate } };
    return null;
  }

  private static filterNumber(field: FiledSearchType, matchMode: MatchModeNumberType, value: string) {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    // TODO: Implement number filter logic
    return null;
  }

  private static filterBoolean(field: FiledSearchType, matchMode: MatchModeBooleanType, value: string) {
    const fieldValue = field.callback ? field.callback(value) : value;
    if (fieldValue === undefined || fieldValue === null) return null;

    // TODO: Implement boolean filter logic
    return null;
  }

  /**
   * @description Validate string to Date
   * @date 2025-11-28 06:41:57
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @static
   * @param {string} value
   * @param {boolean} [dateInit=false]
   * @returns {(Date | null)}
   */
  private static validDataSearch(value: string, dateInit: boolean = false): Date | null {
    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);
    const hour = value.slice(11, 13);
    const minute = value.slice(14, 16);
    const second = value.slice(17, 19);

    // YYYY-MM-DD HH:MM:SS
    if (
      !['-', ''].includes(value.slice(4, 5)) ||
      !['-', ''].includes(value.slice(7, 8)) ||
      value.slice(10, 11).trim() !== '' ||
      ![':', ''].includes(value.slice(13, 14)) ||
      ![':', ''].includes(value.slice(16, 17))
    )
      return null;

    let yearValid: string | undefined = undefined;
    let monthValid: string | undefined = undefined;
    let dateValid: string | undefined = undefined;
    let hourValid: string | undefined = undefined;
    let minuteValid: string | undefined = undefined;
    let secondValid: string | undefined = undefined;

    if (/^\d+$/.test(year)) {
      if (Number(year) < 1 || Number(year) > 9999) return null;
      yearValid = (Number(year) >= 1 && Number(year) <= 9999 ? year : dateInit ? '1' : '9999').padStart(4, '0');
    }

    if (/^\d+$/.test(month) || month === '') {
      if ((Number(month) < 1 || Number(month) > 12) && month !== '') return null;
      monthValid = (Number(month) >= 1 && Number(month) <= 12 ? month : dateInit ? '1' : '12').padStart(2, '0');
    }

    if (/^\d+$/.test(day) || day === '') {
      if ((Number(day) < 1 || Number(day) > 31) && day !== '') return null;
      dateValid = (Number(day) >= 1 && Number(day) <= 31 ? day : dateInit ? '1' : '31').padStart(2, '0');
    }

    if (/^\d+$/.test(hour) || hour === '') {
      if ((Number(hour) < 0 || Number(hour) > 23) && hour !== '') return null;
      hourValid = (Number(hour) >= 0 && Number(hour) <= 23 && hour != '' ? hour : dateInit ? '0' : '23').padStart(2, '0');
    }

    if (/^\d+$/.test(minute) || minute === '') {
      if ((Number(minute) < 0 || Number(minute) > 59) && minute !== '') return null;
      minuteValid = (Number(minute) >= 0 && Number(minute) <= 59 && minute != '' ? minute : dateInit ? '0' : '59').padStart(2, '0');
    }

    if (/^\d+$/.test(second) || second === '') {
      if ((Number(second) < 0 || Number(second) > 59) && second !== '') return null;
      secondValid = (Number(second) >= 0 && Number(second) <= 59 && second != '' ? second : dateInit ? '0' : '59').padStart(2, '0');
    }

    if (!yearValid || !monthValid || !dateValid || !hourValid || !minuteValid || !secondValid) return null;
    return new Date(`${yearValid}-${monthValid}-${dateValid}T${hourValid}:${minuteValid}:${secondValid}.000Z`);
  }
}
