import type { Item } from "$lib/types";

export const abbr = (str: string) => {
    if (str !== null && str.length !== 0) {
        return str.match(/\b([A-Za-z0-9])/g).join('').toUpperCase();
    }
    return str;
}


export const isDarkBg = (hex: string) => {
		
    const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
    
    const hRed = hexToR(hex);
    const hGreen = hexToG(hex);
    const hBlue = hexToB(hex);
    

    function hexToR(h: string) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h: string) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h: string) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h: string) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

    const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
      if (cBrightness > threshold){return false;} else { return true;}	
  }


export const priceFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
 });

 export const percentageFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
 })

export const extractSvcCharge = (amount: number, svcCharge: number) => {
    const derivedSvcCharge = amount * svcCharge / 100;
    return derivedSvcCharge;
}

export const extractGst = (extractedSvcCharge: number, amount: number, gst: number) => {
    const derivedGst = (extractedSvcCharge + amount) * gst / 100;
    return derivedGst;
}

export const calculateGstAndSvcCharge = (svcCharge: number, amount: number, gst: number ) => {
    const extractedSvcCharge = extractSvcCharge(amount, svcCharge);
    const extractedGst = extractGst(extractedSvcCharge, amount, gst);

    return amount + extractedSvcCharge + extractedGst;
 }

export const formatCopyText = (name: string, items: Item[], subtotal: number, gst: number, svcCharge: number) => {
    const extractedSvcCharge = extractSvcCharge(subtotal, svcCharge);
    const extractedGst = extractGst(extractedSvcCharge, subtotal, gst);

    let text = `**${name}**\n\n`;
    items.forEach((item, index) => text += `\`\`\`${index + 1}: ${item.name} - $${priceFormatter.format(item.price)}\`\`\`\n`);
    text += "\n-------------------\n";
    text += "```";
    text += `Subtotal - $${priceFormatter.format(subtotal)}`;
    text += "```\n";
    text += `\`\`\`Service Charge - $${priceFormatter.format(extractedSvcCharge)}\`\`\`\n`;
    text += `\`\`\`GST - $${priceFormatter.format(extractedGst)}\`\`\`\n`;
    text += `\`\`\`Total - $${priceFormatter.format(subtotal + extractedGst + extractedSvcCharge)}\`\`\`\n`;
    return text;
}

export const copyToClipboard = async (formattedText: string) => {
    await navigator.clipboard.writeText(formattedText);
}