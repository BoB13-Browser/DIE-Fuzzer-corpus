let neuter = buffer => {
  try {
    postMessage("", "invalid", [buffer]);
  } catch (e) {}
}; // Helper function to exchange ice candidates between
// two local peer connections


function exchangeIceCandidates(pc1, pc2) {
  // private function
  function doExchange(localPc, remotePc) {
    localPc.addEventListener('icecandidate', event => {
      const {
        candidate
      } = event; // Guard against already closed peerconnection to
      // avoid unrelated exceptions.

      if (remotePc.signalingState !== 'closed') {
        remotePc.addIceCandidate(candidate);
      }
    });
  }

  doExchange(pc1, pc2);
  doExchange(pc2, pc1);
}

var scrollSmoothTo = function (position) {
  return;

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      return setTimeout(callback, 64);
    };
  }

  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  var step = function () {
    var distance = position - scrollTop;
    scrollTop = scrollTop + distance / 8;

    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position);
    } else {
      window.scrollTo(0, scrollTop);
      requestAnimationFrame(step);
    }
  };

  step();
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function remove(idx) {
  console.log(`removeIframe-> test_frame_${idx}`);
  let frame = document.getElementById("test_frame_" + idx);
  frame.parentNode.removeChild(frame);
}

function removeFrame(idx) {
  console.log(`--removeFrame--->${idx}`);
  setTimeout(remove(idx), 400);
}

function freememory() {
  try {
    window.gc();
  } catch (err) {}

  try {
    if (!window.gc) {
      for (var i = 0; i < 100; i++) {
        new ArrayBuffer(0x1000000);
      }
    }
  } catch (err) {}
}

function make_msgchat(arg_0, arg_cb) {
  let channel = new MessageChannel();
  let localPort = channel.port1;
  let externalPort = channel.port2;
  externalPort.onmessage = arg_cb;
  localPort.postMessage(arg_0);
}

var runcount = {
  'jsfuzzer': 0,
  'eventhandler1': 0,
  'eventhandler2': 0,
  'eventhandler3': 0,
  'eventhandler4': 0,
  'eventhandler5': 0
};

function GV(f_vs, var_type) {
  if (f_vs[var_type]) {
    return f_vs[var_type];
  } else {
    return null;
  }
}

function SV(f_vs, var_name, var_type) {
  f_vs[var_type] = var_name;
}

var f_vs = {};

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function triggerConcurrentGC() {
  console.log('call-> triggerConcurrentGC\n');
  mygc(0x130);
  await sleep(0);
  mygc(0x400);
}

function mygc(n) {
  var keeper = new Array(n);

  for (var i = 0; i < n; i++) {
    keeper[i] = new Array(0x3000);
  }

  keeper = null;
} //


function help_tag2id(tag, idx) {
  try {
    tag = tag.toLowerCase();
    {
      //console.log(`help_tag2id -> querySelector:${tag}`);
      let t2 = document.querySelectorAll(tag);
      if (0 == t2.length) throw `FAIL: help_tag2id -> querySelectorAll:${tag}`;
      t3 = t2[idx % t2.length];
      return t3;
    }
  } catch (e) {
    let t1 = document.body;

    try {
      t2 = document.getElementById(`id${idx % 512}`);
      t1 = t2 ? t2 : t1;
    } catch (e) {}

    let r0 = (() => {
      let t0 = document.createElement(tag);
      if (t0 instanceof HTMLUnknownElement) t0 = document.createElementNS("http://www.w3.org/2000/svg", tag);
      t1.appendChild(t0);
      return t0;
    })();

    return r0;
  }
}

(function upup() {
  //console.log('upup');
  try {
    document.body.offsetTop;
  } catch (e) {}

  setTimeout(upup, 800);
})();

wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));