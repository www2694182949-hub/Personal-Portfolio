const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:.15});
revealEls.forEach(el=>io.observe(el));

const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  particles = Array.from({length: 36}, ()=>({
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    vx: (Math.random()-.5)*0.25,
    vy: (Math.random()-.5)*0.25,
    r: Math.random()*1.8 + .6
  }));
}
let mouseX = 0.5;
let mouseY = 0.5;
let waveTime = 0;

window.addEventListener('pointermove', (e)=>{
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
});

function drawBackground(){
  waveTime += 0.006;
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  const grad = ctx.createLinearGradient(0,0,window.innerWidth,window.innerHeight);
  grad.addColorStop(0,'rgba(255,255,255,1)');
  grad.addColorStop(.55,'rgba(247,247,245,1)');
  grad.addColorStop(1,'rgba(239,240,242,1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  const waveCount = 4;
  for(let i=0;i<waveCount;i++){
    const baseY = window.innerHeight * (0.18 + i * 0.205);
    const amp = 18 + i * 4 + Math.abs(mouseY - 0.5) * 18;
    const phase = waveTime * (0.8 + i * 0.08) + (mouseX - 0.5) * 1.9 + i * 0.75;
    const freq = (Math.PI * 2) / (window.innerWidth * (0.42 + i * 0.025));

    ctx.beginPath();
    for(let x=0;x<=window.innerWidth;x+=8){
      const y = baseY
        + Math.sin(x * freq + phase) * amp
        + Math.sin(x * freq * 0.48 - phase * 0.65) * (amp * 0.28);
      if(x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.strokeStyle = `rgba(20,20,20,${0.055 + i*0.008})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>window.innerWidth) p.vx *= -1;
    if(p.y<0||p.y>window.innerHeight) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = 'rgba(0,0,0,.065)';
    ctx.fill();
  });

  requestAnimationFrame(drawBackground);
}
resizeCanvas();
drawBackground();
window.addEventListener('resize', resizeCanvas);

const projectData = {
  jiangsu: {
    index: '01 / Motion Project',
    title: '江苏凤凰出版社｜AI科学科普视频系列',
    lead: '实习项目。围绕“猫头鹰的颈椎”“白天黑夜交替的秘密”等科学主题，独立负责从前期研究到最终交付的完整内容制作流程。',
    cover: 'assets/jiangsu-science.png',
    videos: [
      {
        src: 'assets/videos/phoenix_daynight.mp4',
        title: '白天黑夜交替的秘密',
        label: '视频 01'
      },
      {
        src: 'assets/videos/phoenix_owl.mp4',
        title: '猫头鹰的颈椎',
        label: '视频 02'
      }
    ],
    info: [
      ['项目类型','实习项目 / AI科学科普视频'],
      ['我的职责','资料调研、脚本撰写、分镜设计、AI图片生成、AI视频生成、配音音效、剪辑合成、字幕包装、与客户沟通修改、最终交付'],
      ['项目亮点','从0到1完整负责两个视频项目，兼顾创意、制作与沟通']
    ],
    blocks: [
      ['项目概述','该项目强调内容准确性、节奏控制与信息可视化表达。我在保证科普性的同时，也尽量让成片兼具观看趣味与传播效率。'],
      ['我的收获','在真实项目中更加系统地理解了客户需求、反馈修改与交付标准，也进一步强化了我对项目推进与落地执行的兴趣。']
    ]
  },
  robot: {
    index: '02 / Motion Project',
    title: '家用助行宝｜四足轮椅机器人展示视频',
    lead: '竞赛动画项目，聚焦“安全助坐与智能导航”的产品展示。以清晰演示产品功能和使用场景为核心，完成整体视频表达。',
    cover: 'assets/robot-cover.png',
    videos: [{src:'assets/videos/robot.mp4', title:'家用助行宝机器人展示视频', label:'视频'}],
    info: [
      ['项目类型','产品展示视频 / 智能机器人创意竞赛'],
      ['团队形式','三人团队'],
      ['项目亮点','关注产品逻辑与视觉呈现的统一，帮助复杂功能更易理解']
    ],
    blocks: [
      ['设计重点','通过简洁镜头和清晰结构展示产品卖点，让展示视频既具科技感，又能快速传达功能信息。'],
      ['能力体现','在团队协作中参与核心内容梳理与展示表达，锻炼了跨角色配合与项目整合能力。']
    ]
  },
  oasis: {
    index: '03 / Motion Project',
    title: '绿洲 Oasis｜品牌创意广告影像',
    lead: '个人动画项目，以品牌氛围、叙事感与视觉风格统一为核心，尝试用动态影像建立更具感染力的品牌表达。',
    cover: 'assets/oasis-cover.png',
    videos: [{src:'assets/videos/oasis.mp4', title:'绿洲 Oasis', label:'视频'}],
    info: [
      ['项目类型','品牌广告影像 / 个人项目'],
      ['制作方式','独立完成'],
      ['项目亮点','重视整体视觉气质、镜头节奏与品牌氛围塑造']
    ],
    blocks: [
      ['项目概述','项目从视觉设定、画面风格到成片节奏均由我主导，希望通过影像建立更完整的品牌体验。'],
      ['能力体现','体现了我在独立推进项目、统筹画面风格与完成动态成片方面的能力。']
    ]
  },
  dream: {
    index: '04 / Motion Project',
    title: '都市造梦企划｜动态海报设计',
    lead: '围绕杭州西湖未来文旅场景展开的动态海报设计。该项目以手绘设定与手动 K 帧方式完成，强调创意概念与视觉统一。',
    cover: 'assets/dream-cover.png',
    videoLayout: 'portrait-row',
    videos: [
      {src:'assets/videos/dream_gongchenqiao.mp4', title:'拱宸桥', label:'视频01'},
      {src:'assets/videos/dream_city.mp4', title:'市中心', label:'视频02'},
      {src:'assets/videos/dream_xihu.mp4', title:'西湖', label:'视频03'}
    ],
    info: [
      ['项目类型','动态海报 / 个人项目'],
      ['制作方式','手绘设定 + 手动K帧'],
      ['项目亮点','以系列海报形式展开，兼顾世界观、色彩与场景叙事']
    ],
    blocks: [
      ['项目概述','作品围绕“都市造梦”主题展开，以多张风格统一的海报构建未来文旅场景，强调平面与动态之间的延展关系。'],
      ['能力体现','项目更突出我的视觉创意能力、插画表达与动态设计节奏控制。']
    ]
  },
  gengong: {
    index: '01 / Graphic Project',
    title: '根宫佛国 × 西游记｜IP联名设计提案',
    lead: '参加全国会展策划创意大赛的文旅 IP 联名提案。以“根宫佛国 × 西游记”为主题，尝试将景区文化与经典 IP 进行融合表达。',
    cover: 'assets/gengong-cover.png',
    showCoverInHero: true,
    galleryLayout: 'grid-3',
    gallery: [
      {src:'assets/gengong-step-process.png', alt:'根宫佛国项目草图绘制与生成流程'},
      {src:'assets/gengong-char-tang.png', alt:'佛缘唐角色简介'},
      {src:'assets/gengong-char-wukong.png', alt:'灵悟孙角色简介'},
      {src:'assets/gengong-char-bajie.png', alt:'呆蓬猪角色简介'},
      {src:'assets/gengong-char-wujing.png', alt:'憨行沙角色简介'},
      {src:'assets/gengong-char-bear.png', alt:'无念熊角色简介'},
      {src:'assets/gengong-card.png', alt:'IP卡牌设计展示'},
      {src:'assets/gengong-blindbox.png', alt:'盲盒设计展示'},
      {src:'assets/gengong-emojis.png', alt:'表情包设计展示'},
      {src:'assets/gengong-merch-1.png', alt:'文创展示一'},
      {src:'assets/gengong-merch-2.png', alt:'文创展示二'},
      {src:'assets/gengong-game.png', alt:'游戏展示'}
    ],
    info: [
      ['项目类型','文旅IP联名提案'],
      ['团队形式','五人团队'],
      ['项目成果','全国会展策划创意大赛 国一']
    ],
    blocks: [
      ['项目概述','项目从文化挖掘、概念设定到视觉呈现均围绕“西游记”与“根宫佛国”的结合展开，强调文旅传播语境下的视觉转化。'],
      ['我的参与','参与提案中的核心视觉呈现与相关设计内容，积累了在团队项目中协同输出与整合呈现的经验。']
    ]
  },
  luoyuan: {
    index: '02 / Graphic Project',
    title: '罗源县城市形象｜LOGO与视觉识别设计',
    lead: '个人平面项目，围绕罗源县城市形象展开品牌视觉设计，尝试从地域文化中提炼识别元素，形成完整的 Logo 与视觉表达。',
    cover: 'assets/luoyuan-cover-new.png',
    galleryLayout: 'stacked',
    gallery: [
      {src:'assets/luoyuan-sheet-1.jpg', alt:'罗源县城市形象标识展示一'},
      {src:'assets/luoyuan-sheet-2.jpg', alt:'罗源县城市形象标识展示二'}
    ],
    info: [
      ['项目类型','城市形象LOGO设计'],
      ['团队形式','个人项目'],
      ['项目亮点','从概念提炼到视觉呈现基本由我独立完成']
    ],
    blocks: [
      ['项目概述','设计以凤凰、海湾、山海意象等为切入点，构建具备地方辨识度的城市品牌标识，并延展整体视觉风格。'],
      ['能力体现','该项目更能体现我在平面设计、品牌识别构建与独立推进设计项目方面的能力。']
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalPanel = document.getElementById('modalPanel');
const modalClose = document.getElementById('modalClose');

function buildMediaHtml(data){
  if(data.gallery && data.gallery.length){
    const galleryClass = `project-gallery ${data.galleryLayout || 'grid-3'}`;
    return `
      <section class="${galleryClass}">
        ${data.gallery.map((item, index)=>`
          <figure class="gallery-item">
            <img src="${item.src}" alt="${item.alt || (data.title + '图片' + (index + 1))}" loading="lazy">
          </figure>
        `).join('')}
      </section>
    `;
  }
  if(data.videos && data.videos.length){
    const stackClass = `video-stack${data.videoLayout ? ' ' + data.videoLayout : ''}`;
    return `
      <div class="${stackClass}">
        ${data.videos.map((video)=>`
          <div class="video-item">
            <div class="video-item-title">${video.label} · ${video.title}</div>
            <video controls playsinline preload="metadata">
              <source src="${video.src}" type="video/mp4">
            </video>
          </div>
        `).join('')}
      </div>
    `;
  }
  return `<div class="modal-cover"><img src="${data.cover}" alt="${data.title}"></div>`;
}

function renderProject(key){
  const data = projectData[key];
  if(!data) return;

  const infoHtml = data.info.map(item=>`<div><span>${item[0]}</span><p>${item[1]}</p></div>`).join('');
  const blocksHtml = data.blocks.map(block=>`
    <section class="modal-block">
      <h3>${block[0]}</h3>
      <div><p>${block[1]}</p></div>
    </section>`).join('');

  const hasHeroCover = !!(data.gallery && data.showCoverInHero && data.cover);
  const heroClass = data.gallery
    ? `modal-hero has-gallery${hasHeroCover ? ' with-cover' : ''}`
    : `modal-hero ${data.videos ? 'has-videos' : ''} ${data.videoLayout ? 'layout-' + data.videoLayout : ''}`.trim();

  const heroMediaHtml = data.gallery
    ? (hasHeroCover ? `<div class="modal-media-wrap gallery-cover-wrap"><div class="modal-cover"><img src="${data.cover}" alt="${data.title}"></div></div>` : '')
    : `<div class="modal-media-wrap">${buildMediaHtml(data)}</div>`;

  const galleryHtml = data.gallery ? buildMediaHtml(data) : '';

  modalPanel.innerHTML = `
    <section class="${heroClass}">
      <div>
        <div class="modal-index">${data.index}</div>
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-lead">${data.lead}</p>
      </div>
      ${heroMediaHtml}
    </section>
    ${galleryHtml}
    <section class="modal-grid">${infoHtml}</section>
    ${blocksHtml}
  `;

  initModalMedia();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function initModalMedia(){
  return;
}

document.querySelectorAll('.work-row').forEach(btn=>{
  btn.addEventListener('click', ()=>renderProject(btn.dataset.project));
});

function closeModal(){
  modalPanel.querySelectorAll('video').forEach(video=>{
    video.pause();
    video.currentTime = 0;
  });
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{
  if(e.target === modal) closeModal();
});
document.addEventListener('keydown',(e)=>{
  if(e.key === 'Escape') closeModal();
});
