export default function formatTimeRange(inputTime) {
  // Chia chuỗi thành mảng các phần tử
  var times = inputTime.split(' - ');

  // Chuyển đổi định dạng cho từng phần tử
  var formattedTimes = times.map(function (time) {
    var parts = time.split(':');
    var hours = parts[0];
    var minutes = parts[1];

    // Thêm "h" vào giữa giờ và phút
    return hours + 'h' + minutes;
  });

  // Kết hợp lại thành chuỗi mới
  var formattedRange = formattedTimes.join(' - ');

  return formattedRange;
}

export default function formatDate(inputDateString) {
  const originalDate = new Date(inputDateString);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default function formatDateShow(inputDateString) {
  const originalDate = new Date(inputDateString);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export default function formatPriceVND(price){
    const formatterPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      return formatterPrice.format(price)
}
