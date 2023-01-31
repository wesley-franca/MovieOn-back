export function cleanText(text: string) {
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
    return cleanText;
}
