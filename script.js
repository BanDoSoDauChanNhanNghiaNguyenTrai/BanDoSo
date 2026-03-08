let currentActiveMarker = null;
function highlightMarker(marker) {
  // nếu đã có marker active trước đó
  if (currentActiveMarker) {
    currentActiveMarker.setIcon(normalIcon);
  }

  // phóng to marker mới
  marker.setIcon(activeIcon);

  currentActiveMarker = marker;
}
// ================= IMAGE DATA =================
let currentImages = [];
let currentIndex = 0;

// =======================
// 1. GIỚI HẠN VIỆT NAM
// =======================

// Góc Tây Nam và Đông Bắc Việt Nam
var boundsVN = L.latLngBounds([8.18, 102.14], [23.39, 109.46]);

// Khởi tạo bản đồ
var map = L.map("map", {
  center: [16.0471, 108.2068],
  zoom: 6,
  minZoom: 5,
  maxZoom: 12,
  maxBounds: boundsVN,
  maxBoundsViscosity: 1.0,
});

// Nền bản đồ OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  noWrap: true,
}).addTo(map);

// =======================
// 2. LOAD GEOJSON VIỆT NAM
// =======================

fetch("data/vietnam.geojson")
  .then((res) => res.json())
  .then((data) => {
    // Layer Việt Nam
    var vietnamLayer = L.geoJSON(data, {
      style: {
        color: "#ff0000",
        weight: 1,
        fillColor: "#00ff00",
        fillOpacity: 0.25,
      },

      onEachFeature: function (feature, layer) {
        // Popup tên tỉnh
        if (feature.properties.name) {
          layer.bindPopup("<b>" + feature.properties.name + "</b>");
        }

        // Hover highlight
        layer.on({
          mouseover: function (e) {
            e.target.setStyle({
              fillColor: "#ffff00",
              fillOpacity: 0.6,
            });
          },
          mouseout: function (e) {
            vietnamLayer.resetStyle(e.target);
          },
        });
      },
    }).addTo(map);

    // Zoom vừa khít Việt Nam
    map.fitBounds(vietnamLayer.getBounds());

    // Che phần ngoài Việt Nam
    maskOutsideVietnam(data);
  });

// =======================
// 3. MASK NGOÀI VIỆT NAM
// =======================

function maskOutsideVietnam(geojson) {
  // Polygon toàn thế giới
  var world = [
    [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180],
    ],
  ];

  // Ghép lỗ là Việt Nam
  var mask = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: world.concat(geojson.features[0].geometry.coordinates),
    },
  };

  // Layer che
  L.geoJSON(mask, {
    style: {
      fillColor: "#ffffff",
      fillOpacity: 1,
      stroke: false,
    },
  }).addTo(map);
}

// ICON BÌNH THƯỜNG
var normalIcon = L.icon({
  iconUrl: "data/position.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

// ICON PHÓNG TO
var activeIcon = L.icon({
  iconUrl: "data/position.png",
  iconSize: [70, 70],
  iconAnchor: [35, 70],
});
// ================= MARKER =================
// ================= Chí Linh =================
var chiLinh = [21.109, 106.394];

var markerChiLinh = L.marker(chiLinh, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerChiLinh);
    map.flyTo(chiLinh, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Chí Linh – Côn Sơn, Hải Dương (Hải Phòng hiện nay)",

      slides: [
        {
          img: "img/Suoiconson.jpg",
          text: `
        <h3>Sự xuất hiện của địa danh Côn Sơn trong tác phẩm Côn Sơn ca của Nguyễn Trãi</h3>

<p>Địa danh <b>Côn Sơn</b> xuất hiện ngay từ đầu bài và được lặp lại nhiều lần:</p>

<ul>
  <li><i>“Côn Sơn hữu tuyền”</i> (Côn Sơn có suối)</li>
  <li><i>“Côn Sơn hữu thạch”</i> (Côn Sơn có đá)</li>
</ul>

<p>Qua đó, Côn Sơn hiện lên với những hình ảnh đặc trưng của thiên nhiên:</p>

<ul>
  <li><b>Suối</b> chảy rì rầm như tiếng đàn.</li>
  <li><b>Đá</b> rêu phẳng sạch như chiếu ngồi.</li>
  <li><b>Thông</b> và <b>trúc xanh</b> mát tạo không gian thanh tĩnh.</li>
</ul>

<p>
Côn Sơn không chỉ là một địa danh cụ thể mà còn được miêu tả như
<b>một không gian sống, một thế giới thiên nhiên thanh sạch và yên bình</b>.
</p>
        `,
        },

        {
          img: "img/Suoiconson2.jpg",
          text: `
          <hr>
          <h3> Tư tưởng hòa hợp với thiên nhiên</h3>
        <p>
Ngay từ đầu bài thơ, thiên nhiên Côn Sơn được miêu tả bằng những hình ảnh rất cụ thể:
<b>suối, đá, thông, trúc</b>.
</p>

<ul>
  <li><i>“Côn Sơn hữu tuyền… Ngô dĩ vi cầm huyền”</i> → tiếng suối được cảm nhận như tiếng đàn cầm.</li>
  <li><i>“Côn Sơn hữu thạch… Ngô dĩ vi đan tịch”</i> → đá rêu phẳng được xem như chiếu êm để ngồi.</li>
</ul>

<p>
Những hình ảnh này cho thấy thiên nhiên không xa lạ mà trở thành
<b>người bạn gần gũi của con người</b>, mang lại cảm giác thanh tĩnh và dễ chịu.
</p>

<p>
Nguyễn Trãi không chỉ ngắm cảnh mà còn trực tiếp sống trong thiên nhiên:
</p>

<ul>
  <li>nằm nghỉ dưới bóng thông</li>
  <li>ngâm thơ bên rừng trúc</li>
</ul>

<p>
Các động từ <i>“yển tức”</i> (nghỉ ngơi), <i>“ngâm tiêu”</i> (ngâm thơ) cho thấy con người
thả mình vào nhịp sống của núi rừng, tìm thấy sự thư thái và tự do trong thiên nhiên.
</p>

<p>
Từ cảnh Côn Sơn, Nguyễn Trãi bày tỏ quan niệm sống:
</p>

<ul>
  <li><i>“Vạn chung cửu đỉnh hà tất nhiên”</i> → danh lợi, quyền quý không phải điều quan trọng.</li>
  <li><i>“Ẩm thuỷ phạn sơ tuỳ phận túc”</i> → sống giản dị, thuận theo tự nhiên là đủ.</li>
</ul>

<p>
Thiên nhiên Côn Sơn trở thành không gian đối lập với cuộc sống danh lợi chốn quan trường,
nơi con người tìm được <b>sự thanh cao và tự do tinh thần</b>.
</p>

<p>
Ở phần cuối bài thơ, từ không gian núi rừng yên tĩnh, Nguyễn Trãi suy nghĩ về:
</p>

<ul>
  <li>sự ngắn ngủi của đời người</li>
  <li>sự vô nghĩa của danh lợi</li>
  <li>vòng tuần hoàn của cuộc sống</li>
</ul>

<p>
Điều này cho thấy thiên nhiên không chỉ là nơi nghỉ ngơi mà còn là
<b>nguồn cảm hứng cho những suy tư triết lí sâu sắc về cuộc đời</b>.
</p>
        `,
        },

        {
          img: "img/Suoiconson3.jpg",
          text: `
          <hr>
        <h3> Quan niệm sống và tư tưởng nhân nghĩa trong Côn Sơn ca</h3>

<h4> Đề cao lối sống thanh cao, thuận theo tự nhiên</h4>
<p>Trong bài thơ, Nguyễn Trãi nhiều lần khẳng định quan niệm sống giản dị:</p>

<ul>
  <li><i>“Ẩm thuỷ phạn sơ tuỳ phận túc”</i>
  → uống nước suối, ăn cơm rau cũng đủ.</li>
</ul>

<p>
Điều này thể hiện tư tưởng nhân nghĩa ở chỗ: con người sống thuận theo lẽ tự nhiên,
không chạy theo danh lợi vật chất, giữ cho tâm hồn trong sạch và thanh cao.
</p>

<hr>

<h4> Phê phán sự tham lam và chạy theo quyền lực</h4>
<p>Nguyễn Trãi nhắc đến những nhân vật nổi tiếng giàu sang như:</p>

<ul>
  <li>Đổng Trác</li>
  <li>Nguyên Tái</li>
</ul>

<p>
Đây là những người tượng trưng cho quyền lực và của cải lớn, nhưng cuối cùng
danh tiếng lại không tốt đẹp. Qua đó, tác giả <b>phê phán lối sống tham lam,
chạy theo danh lợi</b>, trái với đạo lý nhân nghĩa.
</p>

<hr>

<h4> Tôn trọng những con người giữ khí tiết và đạo nghĩa</h4>
<p>Ngược lại, Nguyễn Trãi nhắc đến hai nhân vật:</p>

<ul>
  <li>Bá Di</li>
  <li>Thúc Tề</li>
</ul>

<p>
Hai người thà chết đói chứ không ăn thóc của triều đại mà họ cho là không chính đáng.
Việc nhắc đến họ nhằm <b>ca ngợi khí tiết, lòng trung nghĩa và sự giữ gìn đạo lý</b>.
</p>

<hr>

<h4>4. Thể hiện quan niệm nhân sinh nhân văn</h4>
<p>Trong đoạn cuối, Nguyễn Trãi suy ngẫm:</p>

<ul>
  <li>đời người ngắn ngủi</li>
  <li>vinh nhục rồi cũng qua đi</li>
  <li>con người cuối cùng cũng như cỏ cây</li>
</ul>

<p>
Những suy tư này thể hiện <b>tầm nhìn nhân văn và triết lí nhân nghĩa</b>:
con người nên sống đúng đạo lý, giữ tâm hồn thanh sạch thay vì
chạy theo danh lợi phù du.
</p>
        `,
        },
      ],
    });
  });

// ===== LAM KINH - THANH HÓA =====
var lamKinh = [20.0076, 105.2889];

var markerLamKinh = L.marker(lamKinh, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerLamKinh);
    map.flyTo(lamKinh, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Lam Kinh – Lam Sơn (Thanh Hóa)",

      slides: [
        {
          img: "img/Lamkinh.jpg",
          text: `
        <b>TÊN ĐỊA DANH:</b> Lam Kinh – Lam Sơn<br><br>
        Đây là quê hương Lê Lợi và gắn bó sâu sắc với cuộc đời Nguyễn Trãi
        trong khởi nghĩa Lam Sơn.

        Không gian núi rừng Thanh Hóa đã ảnh hưởng lớn đến cảm hứng
        thiên nhiên và tư tưởng nhân nghĩa của ông.
        `,
        },

        {
          img: "img/Lamkinh2.jpg",
          text: `
        <b>Không gian lịch sử – anh hùng ca</b>
        <ul>
          <li>Trung tâm cuộc khởi nghĩa Lam Sơn</li>
          <li>Nơi hình thành tư tưởng "lấy dân làm gốc"</li>
          <li>Gắn với Bình Ngô đại cáo</li>
        </ul>
        `,
        },

        {
          img: "img/Lamkinh3.jpg",
          text: `
        <b>Giá trị văn học</b>
        <ul>
          <li>Hình thành cảm hứng yêu nước trong thơ Nguyễn Trãi</li>
          <li>Kết hợp thiên nhiên và lý tưởng chính trị</li>
          <li>Tạo nên hình tượng nhà nho hành đạo</li>
        </ul>
        `,
        },
      ],
    });
  });

// ===== CỬA BIỂN BẠCH ĐẰNG =====
var bachDang = [20.9066, 106.8519];

var markerBachDang = L.marker(bachDang, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerBachDang);
    map.flyTo(bachDang, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Cửa biển Bạch Đằng (Hải Phòng – Quảng Ninh)",

      slides: [
        {
          img: "img/Bachdang.jpg",
          text: `
          <b>Địa danh Bạch Đằng xuất hiện trực tiếp ở câu thơ thứ hai trong bài thơ Bạch Đằng hải khẩu:</b>

  <blockquote>
  <i>"Khinh khởi ngâm phàm quá Bạch Đằng"</i>
  (Buồm thơ nhẹ lướt qua sông Bạch Đằng)
  </blockquote>

  Hình ảnh này cho thấy nhà thơ đang đi thuyền qua cửa biển, 
  vừa ngắm cảnh vừa suy ngẫm về lịch sử. 
  Việc đặt địa danh ở đầu bài thơ có ý nghĩa như một 
  <b>điểm tựa không gian – lịch sử</b> cho toàn bộ cảm xúc của tác giả.

  <br><br>

  Không chỉ xuất hiện bằng tên gọi, 
  <b>Bạch Đằng còn hiện lên qua những hình ảnh gợi dấu tích chiến trận:</b>

  <ul>
    <li>
      <i>“Ngạc đoạn kình khô sơn khúc khúc”</i>
      → Núi non uốn khúc như thân cá sấu, cá kình bị chặt.
    </li>

    <li>
      <i>“Qua trầm kích chiết ngạn tầng tầng”</i>
      → Bờ sông như những lớp giáo gươm gãy chìm.
    </li>
  </ul>

  Những hình ảnh này gợi liên tưởng đến 
  <b>chiến trường xưa còn in dấu vũ khí và xác thuyền chiến</b>, 
  khiến cảnh vật mang màu sắc <b>hào hùng nhưng cũng hoang vắng</b>.
          `,
        },

        {
          img: "img/Bachdang2.jpg",
          text: `
<hr>

<h3> Tư tưởng hòa hợp với thiên nhiên</h3>

<p>
Tư tưởng hòa hợp với thiên nhiên được thể hiện ngắn gọn nhưng rõ nét 
qua cách tác giả cảm nhận cảnh sông núi Bạch Đằng.
</p>

<p>
Trước hết, thiên nhiên hiện lên <b>hùng vĩ và sống động</b> qua những hình ảnh 
như gió bấc thổi mạnh, cửa biển rộng lớn, núi non uốn khúc, bờ sông tầng lớp. 
Nguyễn Trãi không đứng ngoài quan sát mà <b>hòa mình vào cảnh vật</b>, 
thể hiện qua hình ảnh:
</p>

<blockquote>
<i>“Khinh khởi ngâm phàm quá Bạch Đằng”</i>
(Buồm thơ nhẹ lướt qua sông Bạch Đằng)
</blockquote>

<p>
Điều này cho thấy tâm hồn thi nhân đang <b>giao hòa với thiên nhiên</b>, 
vừa thưởng ngoạn cảnh sắc vừa suy ngẫm về lịch sử.
</p>

<p>
Bên cạnh đó, nhà thơ còn nhìn thiên nhiên như <b>một phần của lịch sử 
và vận mệnh dân tộc</b>. Cảnh núi sông hiểm yếu được xem như 
“trời tạo nên”, góp phần giúp các bậc anh hùng lập nên chiến công. 
Như vậy, thiên nhiên không chỉ là cảnh đẹp mà còn gắn bó mật thiết 
với <b>con người và lịch sử</b>.
</p>

<p>
Cuối bài, khi đứng trước dòng sông và nhìn bóng mình trên nước, 
tác giả rơi vào trạng thái <b>trầm tư, lắng đọng</b>, cho thấy 
sự hòa nhập sâu sắc giữa tâm hồn con người với thiên nhiên.
</p>
          `,
        },

        {
          img: "img/Bachdang3.jpg",
          text: `
<hr>

<h3> Tư tưởng nhân nghĩa trong cảm nhận về lịch sử</h3>

<p>
Những hình ảnh:
</p>

<blockquote>
<i>“Ngạc đoạn kình khô sơn khúc khúc”</i>
<i>“Qua trầm kích chiết ngạn tằng tằng”</i>
</blockquote>

<p>
gợi lại dấu tích chiến trận trên sông Bạch Đằng. Tuy nhiên, Nguyễn Trãi 
không miêu tả chiến tranh để ca ngợi sự tàn khốc mà nhằm gợi nhớ 
<b>chiến thắng chính nghĩa của dân tộc trước kẻ xâm lược</b>.
</p>

<p>
Điều này phù hợp với <b>quan niệm nhân nghĩa</b> của ông: 
đánh giặc là để bảo vệ đất nước và cuộc sống của nhân dân.
</p>

<p>
Câu thơ:
</p>

<blockquote>
<i>“Hào kiệt công danh thử địa tằng”</i>
(Nơi đây từng ghi công danh của các bậc hào kiệt)
</blockquote>

<p>
thể hiện sự trân trọng đối với những người đã chiến đấu vì đất nước,
như <b>Ngô Quyền</b> hay <b>Trần Hưng Đạo</b>.
</p>

<p>
Việc ca ngợi các bậc anh hùng chính là biểu hiện của 
<b>tư tưởng nhân nghĩa</b>: tôn vinh những con người hy sinh 
vì cộng đồng và độc lập dân tộc.
</p>

<p>
Ở hai câu cuối:
</p>

<blockquote>
<i>“Vãng sự hồi đầu ta dĩ hĩ,<br>
Lâm lưu phủ ảnh ý nan thăng.”</i>
</blockquote>

<p>
Nguyễn Trãi không say sưa với chiến thắng mà 
<b>trầm ngâm suy ngẫm trước dòng sông lịch sử</b>.
Thái độ này thể hiện một tâm hồn nhân văn, 
coi trọng <b>hòa bình</b> và ý thức sâu sắc về 
<b>sự biến đổi của thời gian</b>.
</p>
          `,
        },
      ],
    });
  });

// ===== NÚI DỤC THÚY (NON NƯỚC) =====
var ducThuy = [20.2509, 105.9746];

var markerDucThuy = L.marker(ducThuy, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerDucThuy);
    map.flyTo(ducThuy, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Núi Dục Thúy (Núi Non Nước) – Ninh Bình",

      slides: [
        {
          img: "img/Ducthuy.jpg",
          text: `
          <b>TÊN ĐỊA DANH:</b> Núi Dục Thúy (Non Nước)<br><br>
          Danh thắng nằm bên sông Vân, trung tâm thành phố Ninh Bình.
          Nơi đây Nguyễn Trãi từng đề thơ trên vách đá.
          `,
        },

        {
          img: "img/Ducthuy2.jpg",
          text: `
          <b>Giá trị văn học</b><br>
          Bài thơ "Dục Thúy sơn" thể hiện cảm hứng thiên nhiên,
          phong thái ung dung của nhà nho trước cảnh đẹp đất nước.
          `,
        },

        {
          img: "img/Ducthuy3.jpg",
          text: `
          <b>Ý nghĩa</b>
          <ul>
            <li>Thiên nhiên hòa hợp với tâm hồn thi nhân</li>
            <li>Thể hiện tư tưởng thanh cao của Nguyễn Trãi</li>
            <li>Di tích văn học khắc đá tiêu biểu Việt Nam</li>
          </ul>
          `,
        },
      ],
    });
  });

// ===== ĐỘNG THANH HƯ – CÔN SƠN =====
var thanhHu = [21.1127, 106.3885];

var markerThanhHu = L.marker(thanhHu, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerThanhHu);
    map.flyTo(thanhHu, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Động Thanh Hư – Côn Sơn (Chí Linh, Hải Dương)",

      slides: [
        {
          img: "img/Thanhhu.jpg",
          text: `
          <hr>
          <h3>Động Thanh Hư trong bài thơ <i>Mộng sơn trung</i></h3>

<p>
Trong bài thơ <b>Mộng sơn trung</b>, Nguyễn Trãi nhắc đến động Thanh Hư ngay ở câu mở đầu:
</p>

<p><i>“Thanh Hư động lý trúc thiên can”</i>
(Trong động Thanh Hư có hàng nghìn cây trúc)</p>

<p>
Địa danh <b>Thanh Hư</b> được đặt ở vị trí đầu bài thơ, trở thành không gian trung tâm
của toàn bộ bức tranh thiên nhiên. Từ không gian ấy, nhà thơ tiếp tục miêu tả:
</p>

<ul>
<li>Trúc mọc dày đặc trong động</li>
<li>Thác nước bay xuống như lớp kính lạnh</li>
<li>Ánh trăng sáng làm bầu trời trong như nước</li>
</ul>

<p>
Nhờ vậy, động Thanh Hư hiện lên như một <b>cảnh giới thiên nhiên thanh tĩnh,
trong trẻo và huyền ảo</b>. Không gian này dần chuyển từ cảnh thực sang cảnh mộng,
khi nhà thơ chiêm bao thấy cưỡi hạc vàng lên cõi tiên.
</p>
<hr>
<p>
Cảnh sắc thanh tĩnh của núi rừng dẫn đến giấc mộng:
</p>

<p><i>“Mộng kỵ hoàng hạc thượng tiên đàn”</i>
(Chiêm bao thấy cưỡi hạc vàng lên cõi tiên)</p>

<p>
Giấc mơ này cho thấy thiên nhiên đã nâng tâm hồn con người vượt lên khỏi
thế giới trần tục, hướng tới <b>sự tự do và thanh cao</b>. Đây là biểu hiện của
sự hòa hợp sâu sắc giữa thiên nhiên và đời sống tinh thần của con người.
</p>
<hr>
<p>
Qua cảnh động Thanh Hư và giấc mộng cưỡi hạc, Nguyễn Trãi thể hiện khát vọng:
</p>

<ul>
<li>tìm sự thanh tĩnh cho tâm hồn</li>
<li>thoát khỏi những lo toan, ràng buộc của cuộc đời</li>
</ul>

<p>
Thiên nhiên vì thế trở thành <b>không gian tinh thần lý tưởng</b>,
nơi con người tìm thấy sự bình yên và tự do.
</p>
          `,
        },

        {
          img: "img/Thanhhu2.jpg",
          text: `
          <h3> Quan niệm sống và tư tưởng nhân nghĩa trong Côn Sơn ca</h3>
          <h3>1. Khát vọng sống thanh cao, trong sạch</h3>

<p>
Không gian <b>động Thanh Hư</b> với trúc, thác nước và ánh trăng tạo nên một
thế giới thiên nhiên thanh tĩnh. Việc nhà thơ hòa mình vào cảnh núi rừng
cho thấy khát vọng <b>giữ gìn tâm hồn trong sạch, tránh xa sự bon chen
và danh lợi</b>.
</p>

<p>
Đây chính là biểu hiện của tư tưởng <b>nhân nghĩa</b>: con người cần giữ đạo đức
và phẩm giá, sống thanh bạch và ngay thẳng.
</p>

<hr>

<h3>2. Hướng tới đời sống tinh thần cao đẹp</h3>

<p>Hình ảnh:</p>

<p>
<i>“Mộng kỵ hoàng hạc thượng tiên đàn”</i>
(Chiêm bao thấy cưỡi hạc vàng lên cõi tiên)
</p>

<p>
thể hiện mong muốn vượt lên khỏi những ràng buộc tầm thường của đời sống
trần tục, hướng tới một <b>thế giới tinh thần thanh cao</b>.
</p>

<p>
Điều này phản ánh quan niệm nhân nghĩa của Nguyễn Trãi: con người nên
hướng tới những giá trị tinh thần tốt đẹp hơn là chạy theo
vật chất và quyền lực.
</p>

<hr>

<h3>3. Thể hiện nhân cách và khí tiết của người trí thức</h3>

<p>
Giấc mộng cưỡi hạc lên cõi tiên không phải là sự trốn tránh cuộc đời mà là
biểu hiện của <b>nhân cách thanh cao của người trí thức</b>.
</p>

<p>
Qua đó, Nguyễn Trãi khẳng định rằng người có đạo lý phải biết
<b>giữ khí tiết, sống đúng với lẽ phải</b> và không bị cuốn theo
những điều thấp kém.
</p>
          `,
        },

        {
          img: "img/Thanhhu3.jpg",
          text: `
          <h3>Bài thơ: <i>Mộng sơn trung</i></h3>

<p><b>Nguyễn Trãi</b></p>

<p>
Thanh Hư động lý trúc thiên can,<br>
Phi bộc phi phi lạc kính hàn.<br>
Tạc dạ nguyệt minh thiên tự thuỷ,<br>
Mộng kỵ hoàng hạc thượng tiên đàn.
</p>

<h4>Dịch nghĩa</h4>

<p>
Trong động Thanh Hư có hàng nghìn cây trúc,<br>
Thác nước bay xuống như lớp kính lạnh.<br>
Đêm qua trăng sáng trời như nước,<br>
Chiêm bao thấy cưỡi hạc vàng lên cõi tiên.
</p>

<hr>
          `,
        },
      ],
    });
  });

// ===== VÂN ĐỒN – QUẢNG NINH =====
var vanDon = [21.0715, 107.4208];

var markerVanDon = L.marker(vanDon, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerVanDon);
    map.flyTo(vanDon, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Vân Đồn – Quảng Ninh",

      slides: [
        {
          img: "img/Vandon.webp",
          text: `
          <b>TÊN ĐỊA DANH:</b> Vân Đồn<br><br>
          Thương cảng cổ nổi tiếng vùng Đông Bắc Việt Nam,
          cửa ngõ giao thương quan trọng từ thời Trần.
          `,
        },

        {
          img: "img/Vandon2.jpg",
          text: `
          <b>Giá trị lịch sử</b>
          <ul>
            <li>Trung tâm giao thương quốc tế thời trung đại</li>
            <li>Vị trí quân sự – kinh tế quan trọng</li>
            <li>Không gian biển đảo Đông Bắc</li>
          </ul>
          `,
        },

        {
          img: "img/Vandon3.jpg",
          text: `
          <b>Liên hệ văn học</b><br>
          Thể hiện tầm nhìn chiến lược biển đảo,
          tư tưởng giữ nước và phát triển đất nước
          trong tư tưởng Nguyễn Trãi.
          `,
        },
      ],
    });
  });

// ===== NÚI YÊN TỬ =====
var yenTu = [21.1706, 106.7047];

var markerYenTu = L.marker(yenTu, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerYenTu);
    map.flyTo(yenTu, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Núi Yên Tử (Quảng Ninh – Bắc Giang)",

      slides: [
        {
          img: "img/Yentu.jpg",
          text: `
          <b>TÊN ĐỊA DANH:</b> Núi Yên Tử<br><br>
          Trung tâm Phật giáo Trúc Lâm thời Trần,
          biểu tượng của đời sống tu hành và thanh tịnh.
          `,
        },

        {
          img: "img/Yentu2.webp",
          text: `
          <b>Không gian tư tưởng</b><br>
          Thể hiện triết lý buông bỏ danh lợi,
          hòa mình vào thiên nhiên – rất gần với tư tưởng "nhàn".
          `,
        },

        {
          img: "img/Yentu3.jpg",
          text: `
          <b>Liên hệ Nguyễn Trãi</b>
          <ul>
            <li>Ảnh hưởng tinh thần Thiền – Nho – Lão</li>
            <li>Quan niệm sống ẩn dật</li>
            <li>Cảm hứng thiên nhiên thanh cao</li>
          </ul>
          `,
        },
      ],
    });
  });

// ===== CHÙA NGỌC THANH – ĐÔNG TRIỀU =====
var ngocThanh = [21.1097, 106.6029];

var markerNgocThanh = L.marker(ngocThanh, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerNgocThanh);
    map.flyTo(ngocThanh, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Chùa – quán Ngọc Thanh (Đông Triều, Quảng Ninh)",

      slides: [
        {
          img: "img/NgocThanh.webp",
          text: `
          <b>TÊN ĐỊA DANH:</b> Chùa – quán Ngọc Thanh<br><br>
          Di tích cổ thuộc vùng Đông Triều – An Sinh,
          trung tâm văn hóa Phật giáo thời Trần.
          `,
        },

        {
          img: "img/NgocThanh2.webp",
          text: `
          <b>Không gian văn hóa</b><br>
          Gắn với truyền thống Phật giáo Trúc Lâm,
          ảnh hưởng sâu sắc đến tư tưởng nhân sinh thời trung đại.
          `,
        },

        {
          img: "img/NgocThanh3.webp",
          text: `
          <b>Liên hệ Nguyễn Trãi</b>
          <ul>
            <li>Tư tưởng khoan hòa – nhân nghĩa</li>
            <li>Sự hòa hợp Nho – Phật – Lão</li>
            <li>Ảnh hưởng đến quan niệm trị quốc an dân</li>
          </ul>
          `,
        },
      ],
    });
  });

// ===== CỬA BIỂN THẦN PHÙ =====
var thanPhu = [20.008, 105.972];

var markerThanPhu = L.marker(thanPhu, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerThanPhu);
    map.flyTo(thanPhu, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Cửa biển Thần Phù (Thanh Hóa)",

      slides: [
        {
          img: "img/Thanphu.jpg",
          text: `
          <b>TÊN ĐỊA DANH:</b> Cửa biển Thần Phù<br><br>
          Cửa biển cổ quan trọng trong lịch sử giao thông Bắc – Nam,
          nay đã bị phù sa bồi lấp.
          `,
        },

        {
          img: "img/Thanphu2.jpg",
          text: `
          <b>Giá trị lịch sử</b>
          <ul>
            <li>Ranh giới tự nhiên cổ</li>
            <li>Con đường thiên lý thời trung đại</li>
            <li>Không gian giao thương – quân sự</li>
          </ul>
          `,
        },

        {
          img: "img/Thanphu3.webp",
          text: `
          <b>Liên hệ văn học</b><br>
          Gợi không gian lịch sử rộng lớn trong tư duy
          địa – chính trị và ý thức quốc gia thời Nguyễn Trãi.
          `,
        },
      ],
    });
  });
// ================= Thăng Long =================
// ================= Thăng Long =================
var thangLong = [21.0285, 105.8542];

var markerThangLong = L.marker(thangLong, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerThangLong);

    map.flyTo(thangLong, 12, {
      duration: 1.5,
    });

    openSidebar({
      title: "Thăng Long – Hà Nội",

      slides: [
        {
          img: "img/Thanglong.jpg",
          text: `
          <b>TÊN ĐỊA DANH:</b> Thăng Long (Hà Nội)<br><br>
          Kinh thành của Đại Việt qua nhiều triều đại,
          trung tâm chính trị – văn hóa lớn của đất nước.
          `,
        },

        {
          img: "img/Thanglong2.jpg",
          text: `
          <b>Không gian lịch sử</b>
          <ul>
            <li>Nơi triều đình Lê sơ đặt kinh đô</li>
            <li>Trung tâm chính trị của quốc gia</li>
            <li>Chứng kiến nhiều biến động thời đại</li>
          </ul>
          `,
        },

        {
          img: "img/Thanglong3.jpg",
          text: `
          <b>Liên hệ Nguyễn Trãi</b>
          <ul>
            <li>Nơi ông tham gia triều chính</li>
            <li>Đóng góp vào chiến lược kháng Minh</li>
            <li>Gắn với tư tưởng trị quốc – an dân</li>
          </ul>
          `,
        },
      ],
    });
  });
// ================= SIDEBAR =================
let slides = [];
let slideIndex = 0;

function openSidebar(data) {
  document.getElementById("title").innerHTML = data.title;

  slides = data.slides;
  slideIndex = 0;

  updateSlide();

  document.getElementById("sidebar").classList.add("active");
  document.getElementById("mainHeader").classList.add("hide");
}

function updateSlide() {
  document.getElementById("slider").src = slides[slideIndex].img;
  document.getElementById("description").innerHTML = slides[slideIndex].text;
}

function nextImage() {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlide();
}

function prevImage() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlide();
}

map.on("click", function (e) {
  if (!document.getElementById("sidebar").contains(e.originalEvent.target)) {
    closeSidebar();
  }
});

// GO HOME NÚT
function goHome() {
  location.href = "index.html";
}

// ĐÓNG SIDEBAR
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("mainHeader").classList.remove("hide");
}
// ===== NÚT X =====
document.getElementById("close-btn").addEventListener("click", function (e) {
  e.stopPropagation(); // không cho map bắt sự kiện
  closeSidebar();
});

// ================= ĐIỀU HƯỚNG TỪ MỤC LỤC =================
function focusPlace(place) {
  const locations = {
    bachdang: {
      coords: bachDang,
      zoom: 10,
      action: () => map.eachLayer((l) => {}),
    },
    conson: { coords: chiLinh, zoom: 13 },
    yentu: { coords: yenTu, zoom: 13 },
    vandon: { coords: vanDon, zoom: 13 },
    thanphu: { coords: thanPhu, zoom: 13 },
    ngocthanh: { coords: ngocThanh, zoom: 13 },
    thanhhu: { coords: thanhHu, zoom: 13 },
    lamkinh: { coords: lamKinh, zoom: 13 },
    ducthuy: { coords: ducThuy, zoom: 13 },
    thanglong: { coords: thangLong, zoom: 13 },
  };

  const loc = locations[place];
  if (!loc) return;

  map.setView(loc.coords, loc.zoom);

  // Mô phỏng click marker
  setTimeout(() => {
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        if (
          layer.getLatLng().lat === loc.coords[0] &&
          layer.getLatLng().lng === loc.coords[1]
        ) {
          layer.fire("click");
        }
      }
    });
  }, 400);
}

// đọc url
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const place = params.get("place");
  if (place) {
    setTimeout(() => focusPlace(place), 700);
  }
});
