import * as Print from "expo-print";

export async function generatePDF(data) {
  const now = new Date().toLocaleString();

  let html = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial;
        padding: 20px;
        color: #000;
      }

      h1 {
        text-align: center;
        border-bottom: 2px solid #000;
        padding-bottom: 10px;
      }

      .section {
        margin-top: 25px;
      }

      .section h2 {
        border-bottom: 1px solid #000;
        padding-bottom: 5px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      th, td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #000;
        color: #fff;
      }

      .date {
        font-size: 12px;
        color: #555;
      }

      .footer {
        margin-top: 40px;
        font-size: 12px;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <h1>XAMIN ANALYTICS REPORT</h1>
    <p class="date">Generated: ${now}</p>
  `;

  const sections = ["business", "finance", "project", "social"];

  sections.forEach((type) => {
    const filtered = data.filter((d) => d.type === type);

    if (filtered.length === 0) return;

    html += `
      <div class="section">
        <h2>${type.toUpperCase()}</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>Details</th>
          </tr>
    `;

    filtered.forEach((entry) => {
      let details = "";

      Object.keys(entry.data).forEach((key) => {
        details += `${key}: ${entry.data[key]}<br/>`;
      });

      html += `
        <tr>
          <td>${new Date(entry.date).toLocaleString()}</td>
          <td>${details}</td>
        </tr>
      `;
    });

    html += `</table></div>`;
  });

  html += `
    <div class="footer">
      XAMIN • Professional Analytics System
    </div>
  </body>
  </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  return uri;
}