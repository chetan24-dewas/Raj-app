// GalleryPage.jsx — top of file
// Replace with your WhatsApp number: country code + number, digits only (no + or spaces)
const WHATSAPP_NUMBER = "919406654752";

function enquiryLink(img) {
  const text = `Hello Raj Furniture, I'm interested in "${img.caption}". Please share price and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
export function whatsappEnquiryHref(product) {
  const number = "919406654752"; // apna WhatsApp number (country code ke saath, sirf digits)
  const name = typeof product === "string" ? product : product?.name || product?.title || "your product";
  const text = `Hello Raj Furniture, I'm interested in "${name}". Please share price and details.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}