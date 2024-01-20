import { TNewTableOrderIngredients, TOrderElement } from "./data";


export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}



export function setCookie(
    name: string,
    value: string,
    props: { [key: string]: string | number | boolean } & { expires?: number | Date | string } = {}
) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && (exp as Date).toUTCString) {
        props.expires = (exp as Date).toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

export function randomString() {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const random = Array.from(
        { length: 20 },
        () => chars[Math.floor(Math.random() * chars.length)]
    );
    return random.join("");
}
export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;

export function tableLayout(table: Array<string>) {
    let newTable: Array<TNewTableOrderIngredients> = [];
    table.forEach((element: string) => {
        if (element && newTable.filter((el) => el.id === element).length === 0) {
            const filterTable = table.filter((el) => element === el);
            newTable.push({ id: element, count: filterTable.length });
        }
    });
    return newTable;
}

