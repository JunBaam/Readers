export function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 정상적으로 처리될경우
    reader.onload = () => resolve(reader.result);
    //에러
    reader.onerror = error => reject(error);
  });
}
