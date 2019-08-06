window.onload = function() {
  imgLocation("container", "box");

  // 模仿数据
  var imgData = {
    data: [
      { name: "111", src: "../img/photo.jpg" },
      { name: "222", src: "../img/5-1.jpg" },
      { name: "333", src: "../img/login.png" }
    ]
  };
  window.onscroll = function() {
    // if (checkFlag()) {
    var cparent = document.getElementById("container");
    for (var i = 0; i < imgData.data.length; i++) {
      var ccontent = document.createElement("div");
      ccontent.className = "box";
      cparent.appendChild(ccontent);
      var boxImg = document.createElement("div");
      boxImg.className = "box-img";
      ccontent.appendChild(boxImg);
      //标题
      var title = document.createElement("div");
      title.innerHTML = imgData.data[i].name;
      boxImg.appendChild(title);
      //图片
      var img = document.createElement("img");
      img.style.cssText = "opacity: 0; transform:scale(0)";
      img.src = "images/" + imgData.data[i].src + "";
      boxImg.appendChild(img);
      (function(img) {
        // 自执行程序闭包
        setTimeout(function() {
          img.style.cssText = "opacity:1;transform:scale(1)";
        }, 1000); // 这里的时间自定，我是为了测试才写的1000
      })(img);
    }
    imgLocation("container", "box");
    // }
  };

  function imgLocation(parent, content) {
    // 将parent下面的所有content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);

    // 完善图片布局
    var imgWidth = ccontent[0].offsetWidth; // 图片的宽度
    var num = Math.floor(document.documentElement.clientWidth / imgWidth); // 横排的显示个数
    cparent.style.cssText = "width:" + imgWidth * num + "px;margin: 0 auto"; // 给父级添加宽度

    // 计算图片的高度
    var boxHeightArr = [];
    for (var i = 0; i < ccontent.length; i++) {
      if (i < num) {
        boxHeightArr[i] = ccontent[i].offsetHeight;
        console.log(boxHeightArr);
      } else {
        var minHeight = getMin(boxHeightArr); //最小的高度
        var minIndex = getMinheightLocation(boxHeightArr, minHeight);
        ccontent[i].style.position = "absolute";
        ccontent[i].style.top = minHeight + "px";
        ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
        boxHeightArr[minIndex] =
          boxHeightArr[minIndex] + ccontent[i].offsetHeight; // 更新最小高度
      }
    }
  }

  function getMin(arr) {
    // 得到图片的最小高度
    for (var i = 0, ret = arr[0]; i < arr.length; i++) {
      ret = Math.min(ret, arr[i]); // 依次将最小值赋值给ret，ret始终最小
    }
    return ret;
  }

  // 还有一个函数是得到最小高度图片索引getMinheightLocation:
  function getMinheightLocation(boxHeightArr, minHeight) {
    // 得到图片最小高度的序列号
    for (var i in boxHeightArr) {
      if (boxHeightArr[i] === minHeight) {
        return i;
      }
    }
  }

  // 要得到索引位置，才能将图片排在这个索引位置下。
  // 另外一个是得到子集空间的函数，一开始就强调要用模块化的思想来做，我们要做的是函数之外，全局部分才用html里的id值，函数只通过传参来得到里面的东西。
  function getChildElement(cparent, content) {
    // 得到子集空间
    var contentArr = [];
    var allcontent = cparent.getElementsByTagName("*"); // 获取到所有的元素
    for (var i = 0; i < allcontent.length; i++) {
      if (allcontent[i].className === content) {
        contentArr.push(allcontent[i]);
      }
    }
    return contentArr;
  }

  // 关于懒加载

  // 懒加载的思想是 页面的高度 + 滚动的高度 > 最后一张图片距离浏览器顶部的高度，然后就开始加载图片。
  // function checkFlag() {
  //   var cparent = document.getElementById("container");
  //   var ccontent = getChildElement(cparent, "box");

  //   // 数组最后一个元素的高度距离顶部的距离
  //   var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
  //   var scrollTop =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   var pageHeight =
  //     document.documentElement.clientHeight || document.body.scrollHeight;
  //   if (lastContentHeight < scrollTop + pageHeight) {
  //     return true;
  //   }
  // }
};
