import html2canvas from 'html2canvas';

export async function downloadImageFromHtmlString(
  htmlString: string,
  fileName = 'download.png',
  imageType: 'png' | 'jpeg' = 'png',
) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '-9999px';
  wrapper.style.left = '-9999px';
  document.body.appendChild(wrapper);

  const shadowRoot = wrapper.attachShadow({ mode: 'open' });

  const content = document.createElement('div');
  content.innerHTML = htmlString;
  content.style.background = '#fff';
  shadowRoot.appendChild(content);

  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(content, {
    backgroundColor: '#ffffff',
    useCORS: true,
  });

  const mimeType = imageType === 'jpeg' ? 'image/jpeg' : 'image/png';
  const image = canvas.toDataURL(mimeType);

  const link = document.createElement('a');
  link.href = image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  document.body.removeChild(wrapper);
}
