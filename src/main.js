export function renderWithTemplate(
  templateFn,
  parentElement,
  data = {},
  callback,
  position = "afterbegin",
  clear = true,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    callback(data);
  }
}
function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}
export async function loadHeaderFooter(){
 const headerTemplateFn = loadTemplate("/particals/header.html");
  const footerTemplateFn = loadTemplate("/particals/footer.html");
  const headerHTML = await headerTemplateFn();
  const footerHTML = await footerTemplateFn();
  const headerEl = document.querySelector("#header");
  const footerEl = document.querySelector("#footer");
  renderWithTemplate(() => headerHTML, headerEl);
  renderWithTemplate(() => footerHTML, footerEl);
}
