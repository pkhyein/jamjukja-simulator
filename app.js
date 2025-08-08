const ctx = document.getElementById('sleepChart').getContext('2d');
let sleepChart;

function calculateAndRender() {
  const currentAge = parseInt(document.getElementById('currentAge').value);
  const sleepHours = parseFloat(document.getElementById('sleepHours').value);
  const deathAge = parseInt(document.getElementById('deathAge').value);
  document.getElementById('deathAgeLabel').textContent = deathAge;

  const yearsAlive = deathAge - currentAge;
  const sleepTotal = yearsAlive * sleepHours * 365;
  const awakeTotal = yearsAlive * (24 - sleepHours) * 365;
  const afterlifeSleep = (90 - deathAge) * 24 * 365; // 가상의 90세 기준 죽어서 잘 시간

  document.getElementById('afterlifeSleep').textContent =
    `${afterlifeSleep.toLocaleString()} 시간`;

  const labels = ['살아있을 때 수면', '살아있을 때 깨어있음', '죽어서 잘 시간'];
  const data = [sleepTotal, awakeTotal, afterlifeSleep];

  if (sleepChart) sleepChart.destroy();

  sleepChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '시간(시간 단위)',
        data: data,
        backgroundColor: ['#74b9ff', '#55efc4', '#ffeaa7']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '잠죽자 시뮬레이터'
        }
      }
    }
  });
}

document.getElementById('currentAge').addEventListener('input', calculateAndRender);
document.getElementById('sleepHours').addEventListener('input', calculateAndRender);
document.getElementById('deathAge').addEventListener('input', calculateAndRender);

calculateAndRender();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
