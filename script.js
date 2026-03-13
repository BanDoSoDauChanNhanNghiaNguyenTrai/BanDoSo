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
        <h3>1.Sự xuất hiện của địa danh Côn Sơn trong tác phẩm <a href="tacpham.html#consonca">Côn Sơn ca</a> của Nguyễn Trãi</h3>

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
          <h3>2.Tư tưởng hòa hợp với thiên nhiên</h3>
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
        <h3>3. Quan niệm sống và tư tưởng nhân nghĩa trong Côn Sơn ca</h3>

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
          <b>Địa danh Bạch Đằng xuất hiện trực tiếp ở câu thơ thứ hai trong bài thơ <a href="tacpham.html#bachdanghaikhau">Bạch Đằng hải khẩu</a>:</b>

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
          <h3>1. Sự xuất hiện của núi Dục Thúy trong bài Dục Thúy sơn</h3>
<hr>
  Trong bài thơ <a href="tacpham.html#ducthuyson">Dục Thúy sơn</a>, Nguyễn Trãi nhắc đến <b>Núi Dục Thúy</b> ngay từ câu mở đầu:

  <blockquote>
  “Hải khẩu hữu tiên san”<br>
  (Gần cửa biển có núi tiên)
  </blockquote>

  Ngọn núi được giới thiệu như một <b>“núi tiên”</b>, đặt trong không gian gần cửa biển và sông nước rộng lớn.  
  Sau đó, Nguyễn Trãi tiếp tục khắc họa vẻ đẹp của núi qua nhiều hình ảnh:

  <ul>
  <li><i>“Liên hoa phù thủy thượng”</i> – núi như bông sen nổi trên mặt nước.</li>
  <li><i>“Tháp ảnh trâm thanh ngọc”</i> – bóng tháp trên núi như chiếc trâm ngọc cài trên mái tóc xanh của thiên nhiên.</li>
  <li><i>“Ba quang kính thủy hoàn”</i> – ánh nước phản chiếu như tấm gương soi cảnh sắc.</li>
  </ul>

  Nhờ những hình ảnh so sánh giàu tính thẩm mỹ, <b>núi Dục Thúy</b> hiện lên như một cảnh đẹp vừa thực vừa mang vẻ huyền ảo, thanh cao.
          `,
        },

        {
          img: "img/Ducthuy2.jpg",
          text: `
          <h3>2. Sự hòa quyện giữa các yếu tố của thiên nhiên</h3>
<hr>
  Cảnh vật trong bài thơ là sự kết hợp của nhiều yếu tố:

  <ul>
    <li>núi</li>
    <li>nước</li>
    <li>sóng</li>
    <li>ánh sáng</li>
    <li>bóng tháp</li>
  </ul>

  <p><b>Câu thơ:</b></p>

  <blockquote>
  “Ba quang kính thủy hoàn” <br>
  (Ánh sáng trên sóng như gương soi búi tóc biếc.)
  </blockquote>

  <p>
  Hình ảnh này cho thấy nước phản chiếu cảnh núi, tạo nên một không gian thiên nhiên gắn kết và hài hòa. 
  Điều ấy thể hiện quan niệm của Nguyễn Trãi về một thế giới cân bằng và hòa hợp giữa các yếu tố tự nhiên.
  </p>

  <hr>

  <h3>3. Con người hòa mình vào cảnh thiên nhiên</h3>
<hr>
  <p>
  Nguyễn Trãi không đứng ngoài ngắm cảnh mà đặt mình trong không gian thiên nhiên ấy. 
    <blockquote>
  “Tiền niên lũ vãng hoàn.” <br>
  (Năm trước đã nhiều lần đi về.)
  </blockquote>

  Việc ông nhiều lần lui tới nơi này cho thấy:
  </p>

  <ul>
    <li>nhà thơ tìm đến thiên nhiên như một nơi gắn bó thân thuộc</li>
    <li>nơi giúp tâm hồn thanh thản và tĩnh lặng</li>
  </ul>

  <p>
  Như vậy, con người và thiên nhiên trong bài thơ không tách rời mà hòa làm một với nhau.
  </p>
          `,
        },

        {
          img: "img/Ducthuy3.jpg",
          text: `
          <h3>4. Thiên nhiên gắn với chiều sâu văn hóa và cảm xúc</h3>
<hr>
  <p>
  Trong bài thơ <i>Dục Thúy sơn</i>, thiên nhiên không chỉ được cảm nhận như một cảnh đẹp 
  mà còn trở thành không gian lưu giữ ký ức văn hóa và gợi lên cảm xúc sâu lắng của nhà thơ.
  Điều này thể hiện rõ ở hai câu cuối:
  </p>

  <blockquote>
  “Hữu hoài Trương Thiếu Bảo,<br>
  Bi khắc tiễn hoa ban.”<br>
  (Chạnh nhớ tới ông Trương Thiếu Bảo, <br>
Tấm bia đá nói về ông đã lốm đốm rêu phong.)
  </blockquote>

  <p>
  Khi đứng trước cảnh <b>Núi Dục Thúy</b>, Nguyễn Trãi chợt nhớ đến 
  <b>Trương Hán Siêu (Trương Thiếu Bảo)</b> – một danh sĩ nổi tiếng thời Trần 
  từng để lại dấu tích văn hóa tại nơi này.
  </p>

  <p>
  Hình ảnh <i>Tấm bia đá nói về ông đã lốm đốm rêu phong.</i> cho thấy dấu vết của thời gian, 
  khiến cảnh thiên nhiên mang thêm chiều sâu lịch sử. Vì vậy, núi Dục Thúy 
  không chỉ là cảnh đẹp của tạo hóa mà còn là nơi ghi dấu sự hiện diện của 
  những con người tài đức trong quá khứ.
  </p>

  <p>
  Qua đó, thiên nhiên trở thành cầu nối giữa hiện tại và quá khứ. 
  Đứng trước cảnh núi sông, Nguyễn Trãi không chỉ thưởng ngoạn vẻ đẹp của đất trời 
  mà còn bộc lộ tấm lòng trân trọng đối với bậc hiền tài và truyền thống văn hóa dân tộc.
  </p>
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
          <h3>Động Thanh Hư trong bài thơ <a href="tacpham.html#mongsontrung"><i>Mộng sơn trung</i></a></h3>

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
           <h3>1. Sự xuất hiện của Vân Đồn trong bài thơ Vân Đồn</h3>
<hr>
  <p>
  Trong bài thơ <a href="tacpham.html#vandon">Vân Đồn</a>, Nguyễn Trãi nhắc đến địa danh Vân Đồn ngay từ câu mở đầu:
  </p>

  <blockquote>
  “Lộ nhập Vân Đồn sơn phục sơn”<br>
  (Đường vào Vân Đồn núi non trùng điệp)
  </blockquote>

  <p>
  Địa danh Vân Đồn được đặt ở vị trí trung tâm của bài thơ, mở ra một không gian thiên nhiên 
  rộng lớn và hùng vĩ. Từ đó, nhà thơ tiếp tục miêu tả cảnh sắc đặc trưng của vùng biển đảo:
  </p>

  <ul>
    <li>Núi non chồng lớp, tạo cảm giác trùng trùng điệp điệp.</li>
    <li>Mặt biển xanh trong như gương .</li>
    <blockquote>
    “lam bích trừng minh kính”
    </blockquote>
    <li>Màu nước và núi hòa quyện như mái tóc xanh rủ xuống.</li>
  </ul>

  <p>
  Qua những hình ảnh này, <b>Vân Đồn</b> hiện lên như một bức tranh thiên nhiên rộng lớn, 
  vừa hùng vĩ vừa thơ mộng.
          `,
        },

        {
          img: "img/Vandon2.jpg",
          text: `
          <h3>2. Sự hòa quyện giữa các yếu tố thiên nhiên</h3>
<hr>
  <p>
  Bức tranh thiên nhiên trong bài thơ được tạo nên bởi sự kết hợp của nhiều yếu tố:
  </p>

  <ul>
    <li>núi</li>
    <li>biển</li>
    <li>bầu trời</li>
    <li>ánh sáng</li>
    <li>màu sắc của nước và cây cỏ</li>
  </ul>

  <p><b>Câu thơ:</b></p>

  <blockquote>
  "Thiên khôi địa thiết phó kỳ quan.<br>
  Nhất bàn lam bích trừng minh kính”<br>
  (Trời đất cao rộng rõ là cảnh diệu kỳ.<br>
  Cả một mặt phẳng màu xanh biếc, nước trong như gương sáng,)
  </blockquote>

  <p>
  Hình ảnh này cho thấy biển phản chiếu trời và núi, tạo nên sự hòa hợp giữa các yếu tố của thiên nhiên.
  Điều đó thể hiện cảm nhận của Nguyễn Trãi về một thế giới tự nhiên cân bằng và hài hòa.
  </p>

  <hr>
 <h3>3. “Vạn hộc nha thanh đỏa thúy hoàn”</h3>

  <blockquote>
  (Hàng vạn ô màu huyền xanh như mái tóc rũ.)
  </blockquote>

  <p>
  Câu thơ sử dụng hình ảnh so sánh giàu tính thẩm mỹ. Những dãy núi và đảo ở Vân Đồn 
  được nhìn như mái tóc xanh buông rủ trên mặt biển.
  </p>

  <p>
  Hình ảnh này vừa gợi màu sắc xanh thẳm của núi và cây, vừa tạo cảm giác mềm mại, 
  uyển chuyển cho cảnh vật. Nhờ vậy, thiên nhiên không chỉ hùng vĩ mà còn thơ mộng 
  và sống động trong cảm nhận của thi nhân.
  </p>

  <hr>

  <h3>4. “Vũ trụ đốn thanh trần hải nhạc,”</h3>

  <blockquote>
  (Vũ trụ bỗng thể hiện rõ ràng qua dáng núi và biển,)
  </blockquote>

  <p>
  Ở câu thơ này, thiên nhiên được nâng lên thành biểu tượng của toàn bộ vũ trụ. 
  Núi và biển không chỉ là cảnh vật cụ thể mà còn phản chiếu trật tự và sự 
  trong sạch của đất trời.
  </p>

  <p>
  Từ <i>“đốn thanh”</i> (bỗng trở nên trong sáng, rõ ràng) cho thấy khi đứng trước 
  cảnh biển núi Vân Đồn, nhà thơ cảm nhận được sự thanh lọc của không gian thiên nhiên, 
  khiến tâm hồn con người cũng trở nên sáng tỏ và bình lặng.
  </p>
  
          `,
        },

        {
          img: "img/Vandon3.jpg",
          text: `
          <h3>5. Thiên nhiên tác động đến tâm hồn con người</h3>
<hr>
  <p>
  Khi đứng trước cảnh biển trời rộng lớn, nhà thơ cảm nhận được sự vững vàng trong tâm hồn:
  </p>

  <blockquote>
  “Phong ba bất động thiết tâm can”<br>
  (Sóng gió chẳng lay chuyển được tâm can vững chắc.)
  </blockquote>

  <p>
  Thiên nhiên không chỉ là cảnh đẹp mà còn giúp con người củng cố ý chí và tâm thế.
  Tâm hồn con người trở nên bình tĩnh và mạnh mẽ khi hòa mình vào không gian rộng lớn của đất trời.
  </p>

  <hr>

  <h3>6. Con người hòa mình vào không gian thiên nhiên và đời sống vùng biển</h3>
<hr>
  <p>
  Ở hai câu cuối,
  <blockquote>
  "Vọng trung ngạn thảo thê thê lục, <br>
Đạo thị phiên nhân trú bạc loan."
  (Nhìn vào thấy bờ cỏ màu lục xanh dờn, <br>
Nghe nói người thiểu số xưa từng đỗ thuyền trong vịnh.)
  </blockquote>
  Nguyễn Trãi nhìn thấy bờ cỏ xanh và nhớ đến những con thuyền từng neo đậu trong vịnh.
  Điều này cho thấy thiên nhiên không tách rời đời sống con người mà gắn bó với sinh hoạt và lịch sử của vùng biển.
  </p>

  <p>
  Nhờ vậy, cảnh Vân Đồn hiện lên như một không gian sống nơi thiên nhiên và con người cùng tồn tại hài hòa.
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
// ===== ẢI CHI LĂNG (LẠNG SƠN) =====
var chiLang = [21.8514, 106.6297];

var markerChiLang = L.marker(chiLang, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerChiLang);
    map.flyTo(chiLang, 12, {
      duration: 1.5,
    });

    openSidebar({
      title: "Ải Chi Lăng – Lạng Sơn",

      slides: [
        {
          img: "img/Aichilang.jpg",
          text: `
<div class="sidebar-section">
  <h3>1. Trong Bình Ngô đại cáo (1428)</h3>

  <p><b>Tác phẩm nổi tiếng nhất nhắc đến Chi Lăng là:</b><br>
  <a href="tacpham.html#binhngodaicao">Bình Ngô đại cáo</a></p>

  <p><b>Đoạn nổi tiếng:</b></p>

  <blockquote>
    “Ngày mười tám, trận Chi Lăng, Liễu Thăng thất thế,<br>
    Ngày hai mươi, trận Mã Yên, Liễu Thăng cụt đầu...”
  </blockquote>

  <p>
    Ở đây Nguyễn Trãi nhắc đến trận Chi Lăng năm 1427,
    nơi quân Lam Sơn tiêu diệt đạo quân viện binh nhà Minh
    do Liễu Thăng chỉ huy.
  </p>
</div>
          `,
        },

        {
          img: "img/Aichilang2.jpg",
          text: `
          <hr>
          <h2>Chiến thắng Chi Lăng</h2>

<p>
Ải Chi Lăng (Lạng Sơn) là cửa ngõ chiến lược bảo vệ vùng đồng bằng Bắc Bộ.
Với địa hình thung lũng hẹp, hai bên là núi cao hiểm trở, nơi đây từ lâu
được xem là vị trí thuận lợi để chặn đánh quân xâm lược từ phương Bắc.
</p>

<p>
Năm 1427, trong cuộc khởi nghĩa Lam Sơn do <b>Lê Lợi</b> lãnh đạo,
nghĩa quân đã tổ chức trận mai phục lớn tại Chi Lăng để chặn
đạo viện binh của quân Minh do tướng <b>Liễu Thăng</b> chỉ huy.
</p>

<p>
Khi quân Minh tiến sâu vào thung lũng, nghĩa quân bất ngờ tấn công.
Liễu Thăng bị tiêu diệt, quân Minh hoảng loạn tháo chạy.
Chiến thắng này mở đầu cho chuỗi thất bại của quân Minh và
góp phần quyết định vào thắng lợi của khởi nghĩa Lam Sơn.
</p>

<p>
Trong cuộc kháng chiến ấy, <b>Nguyễn Trãi</b> đóng vai trò quan trọng
trong việc hoạch định chiến lược và cổ vũ tinh thần chiến đấu của nghĩa quân.
</p>
          `,
        },

        {
          img: "img/Aichilang3.webp",
          text: `
          <h2>Ý nghĩa lịch sử</h2>

<p>
Chiến thắng Chi Lăng là một trong những trận đánh quan trọng
nhất của cuộc khởi nghĩa Lam Sơn, góp phần làm tan rã lực lượng
viện binh của quân Minh và buộc chúng phải rút quân khỏi Đại Việt.
</p>

<p>
Trong <b>Bình Ngô đại cáo</b>, Nguyễn Trãi đã khẳng định
tính chính nghĩa của cuộc kháng chiến:
</p>

<blockquote>
“Việc nhân nghĩa cốt ở yên dân,<br>
Quân điếu phạt trước lo trừ bạo.”
</blockquote>

<p>
Những chiến thắng như Chi Lăng không chỉ thể hiện tài
chiến lược của nghĩa quân Lam Sơn mà còn phản ánh
tư tưởng nhân nghĩa của Nguyễn Trãi:
chiến đấu để bảo vệ nhân dân và giành lại độc lập cho đất nước.
</p>
          `,
        },
      ],
    });
  });
// ===== LÀNG NHỊ KHÊ (THƯỜNG TÍN - HÀ NỘI) =====
var nhiKhe = [20.8433, 105.8506];

var markerNhiKhe = L.marker(nhiKhe, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerNhiKhe);
    map.flyTo(nhiKhe, 13, {
      duration: 1.5,
    });

    openSidebar({
      title: "Làng Nhị Khê – Thường Tín, Hà Nội",

      slides: [
        {
          img: "img/nhikhe.jpg",
          text: `
          <h3>Làng Nhị Khê – quê hương của Nguyễn Trãi</h3>

<p><b>Làng Nhị Khê</b> là quê cha của Nguyễn Trãi, nơi gắn bó mật thiết với cuộc đời và sự nghiệp của ông. Và đã được nhắc đến trong tác phẩm <a href="tacpham.html#tanghuunhan">Tặng hữu nhân</a> của Nguyễn Trãi cùng nhiều tác phẩm khác khi ông nhắc đến quê cha.</p>
<blockquote>
<i>“Tha niên Nhị Khê ước,”</i>
(Chúng ta đã hẹn nhau nơi Nhị Khê này,)
</blockquote>


<h4>1. Vị trí địa lý</h4>
<p>
Nhị Khê là một ngôi làng thuộc xã Nhị Khê, huyện Thường Tín, nằm ở phía nam Hà Nội.
Đây là vùng đất có truyền thống văn hiến lâu đời, nổi tiếng với nhiều nhân vật lịch sử
và nghề thủ công truyền thống.
</p>
          `,
        },

        {
          img: "img/nhikhe2.webp",
          text: `
<h4>2. Mối liên hệ với Nguyễn Trãi</h4>

<p>
Nguyễn Trãi sinh năm 1380 trong một gia đình khoa bảng. Cha ông là
<b>Nguyễn Phi Khanh</b> – một trí thức nổi tiếng thời cuối nhà Trần.
</p>

<p>
Nhị Khê được xem là quê cha và nơi thờ tự chính của Nguyễn Trãi,
nơi lưu giữ nhiều di tích gắn với cuộc đời ông.
</p>
          `,
        },

        {
          img: "img/nhikhe3.webp",
          text: `
<h4>3. Di tích liên quan đến Nguyễn Trãi tại Nhị Khê</h4>

<p>Tại làng Nhị Khê hiện còn nhiều di tích tưởng niệm ông, tiêu biểu là:</p>

<ul>
<li><b>Đền thờ Nguyễn Trãi</b> – nơi thờ Nguyễn Trãi và gia tộc.</li>
<li><b>Nhà lưu niệm Nguyễn Trãi</b> – lưu giữ tư liệu, hiện vật về cuộc đời và sự nghiệp của ông.</li>
</ul>

<p>
Những di tích này trở thành địa điểm văn hóa – lịch sử quan trọng,
giúp hậu thế tưởng nhớ công lao của vị anh hùng dân tộc và danh nhân văn hóa.
</p>

<h4>4. Ý nghĩa của quê hương Nhị Khê</h4>

<p>
Làng Nhị Khê không chỉ là nơi sinh trưởng của Nguyễn Trãi mà còn góp phần
hình thành nhân cách, tư tưởng nhân nghĩa và tình yêu đất nước của ông.
</p>

<p>
Ngày nay, nơi đây được xem là một địa chỉ văn hóa tiêu biểu,
gắn với tên tuổi của vị anh hùng dân tộc và danh nhân văn hóa thế giới
<b>Nguyễn Trãi</b>.
</p>
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

  const sidebar = document.getElementById("sidebar");

  sidebar.classList.remove("closing");
  sidebar.classList.add("active");

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
  const sidebar = document.getElementById("sidebar");

  sidebar.classList.remove("active");
  sidebar.classList.add("closing");

  setTimeout(() => {
    sidebar.classList.remove("closing");
  }, 450);

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
    aichilang: { coords: chiLang, zoom: 13 },
    nhikhe: { coords: nhiKhe, zoom: 13 },
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
