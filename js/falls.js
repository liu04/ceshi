window.onload = function() {
  imgLocation("container", "box");
  //ajax模拟数据
  var imgData = {
    data: [
      { src: "2.jpg" },
      { src: "3.jpg" },
      { src: "4.jpg" },
      { src: "5.jpg" },
      { src: "6.jpg" },
      { src: "8.jpg" },
      { src: "2.jpg" },
      { src: "3.jpg" },
      { src: "4.jpg" },
      { src: "5.jpg" },
      { src: "6.jpg" },
      { src: "8.jpg" }
    ]
  };

  window.onscroll = function() {
    if (checkFlag()) {
      //判断是否到底部要加载新的数据
      var cparent = document.getElementById("container");
      //把ajax数据加载进页面
      for (var i = 0; i < imgData.data.length; i++) {
        var ccontent = document.createElement("div");
        ccontent.className = "box";
        cparent.appendChild(ccontent);
        var boximg = document.createElement("div");
        boximg.className = "box_img";
        ccontent.appendChild(boximg);
        var img = document.createElement("img");
        img.src = "img/" + imgData.data[i].src;
        boximg.appendChild(img);
      }
      //把所有图片数据重新定位一次
      imgLocation("container", "box");
    }
  };
};

function checkFlag() {
  var cparent = document.getElementById("container");
  var ccontent = getChildElement(cparent, "box");

  //得到最后一张图距顶部的高度，滚动高度，窗口高度
  var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var pageHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  console.log(lastContentHeight + ":" + scrollTop + ":" + pageHeight);

  if (lastContentHeight < scrollTop + pageHeight) {
    return true;
  }
}

function imgLocation(parent, content) {
  //将parent下所有的content全部取出
  var cparent = document.getElementById(parent);
  var ccontent = getChildElement(cparent, content);
  //根据当前浏览器窗口的宽度，确定每行图片数并固定，居中
  var imgWidth = ccontent[0].offsetWidth; //offsetWidth = width + padding + border
  var num = Math.floor(document.documentElement.clientWidth / imgWidth);
  cparent.style.cssText = "width:" + imgWidth * num + "px;margin:0 auto";
  //alert("pause");
  //设置一个数组，用来承载第一行的图片信息
  var BoxHeightArr = [];
  for (var i = 0; i < ccontent.length; i++) {
    if (i < num) {
      //第一行的图片的高度记录下来
      BoxHeightArr[i] = ccontent[i].offsetHeight;
      //当ajax数据加载后，程序是将所有图片重新定位，所以第一行的图片要清除position:absolute
      ccontent[i].style.position = "static";
    } else {
      var minHeight = Math.min.apply(null, BoxHeightArr);
      var minIndex = getminheightLocation(BoxHeightArr, minHeight);

      //把图放在第一行图索引值最小的下面
      ccontent[i].style.position = "absolute";
      ccontent[i].style.top = minHeight + "px";
      ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";

      //图片放好位置后更新“第一行图片信息的最小高度”，
      //然后利用for循环重复这个动作到结束
      BoxHeightArr[minIndex] =
        BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
    }
  }
}

//获取第一行图片高度最小的索引值
function getminheightLocation(BoxHeightArr, minHeight) {
  for (var i in BoxHeightArr) {
    if (BoxHeightArr[i] == minHeight) {
      return i;
    }
  }
}

//获取所有box
function getChildElement(parent, content) {
  contentArr = parent.getElementsByClassName(content);
  return contentArr;
}
