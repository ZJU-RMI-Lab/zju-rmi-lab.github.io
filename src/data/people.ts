import type { Person, PersonLink, PeopleGroup, LabAlumniCohort } from './types';

// Faculty facts and portraits are sourced from their Zhejiang University profiles.
export const faculty: Person[] = [
  {
    name: 'Qiuguo Zhu',
    role: 'Professor, Zhejiang University',
    bio: 'Qiuguo Zhu is a professor in the College of Control Science and Engineering at Zhejiang University. His research focuses on legged robotics and learning and control for intelligent robots.',
    image: '/images/qiuguo-zhu.jpg',
    links: [
      {
        label: 'University profile',
        icon: 'website',
        href: 'https://person.zju.edu.cn/0011353/0.html',
      },
      { label: 'Email', icon: 'email', href: 'mailto:qgzhu@zju.edu.cn' },
    ],
  },
  {
    name: 'Jun Wu',
    role: 'Professor, Zhejiang University',
    bio: 'Jun Wu is a professor in the College of Control Science and Engineering at Zhejiang University. His research interests include humanoid robot planning and control, multi-agent systems, and networked control.',
    image: '/images/jun-wu.jpg',
    links: [
      { label: 'University profile', icon: 'website', href: 'https://person.zju.edu.cn/0094198' },
      { label: 'Email', icon: 'email', href: 'mailto:junwuapc@zju.edu.cn' },
    ],
  },
];

const links = (email: string, homepage?: string, github?: string): PersonLink[] => [
  ...(homepage ? [{ label: 'Personal page', icon: 'website' as const, href: homepage }] : []),
  ...(email.includes('@')
    ? [{ label: 'Email', icon: 'email' as const, href: `mailto:${email}` }]
    : []),
  ...(github ? [{ label: 'GitHub', icon: 'github' as const, href: github }] : []),
];

// Current members imported from info.xlsx. Missing photos and links remain intentionally absent.
export const peopleGroups: PeopleGroup[] = [
  {
    id: 'postdocs',
    title: 'Postdocs',
    members: [
      {
        name: 'Ash Wan (万耀城）',
        interests: 'Robot Navigation',
        image: '/images/people/ash-wan.jpg',
        links: links(
          'yaw_sang94@hotmail.com',
          'https://scholar.google.com/citations?user=FQfXLUEAAAAJ&hl=en',
          'https://github.com/AshWan13',
        ),
      },
    ],
  },
  {
    id: 'phd-students',
    title: 'PhD Students',
    members: [
      {
        name: '王谦实',
        year: 2025,
        interests: 'Reinforcement Learning, Humanoid',
        links: links('wang1qian2shi3@163.com'),
      },
      {
        name: '于瑞骐',
        year: 2024,
        interests: 'Humanoid & legged robot learning, perceptive locomotion, whole-body control',
        links: links(
          'yrq@zju.edu.cn',
          'https://scholar.google.com.tw/citations?user=Tp8vRJUAAAAJ&hl=zh-CN&oi=ao',
        ),
      },
      {
        name: '王亮',
        year: 2025.9,
        interests: 'Legged robotics; locomotion and navigation; whole-body control',
        image: '/images/people/wang-liang.jpg',
        links: links(
          '3210102182@zju.edu.cn',
          'https://myoooofall.github.io/',
          'https://github.com/myoooofall',
        ),
      },
      {
        name: '王菁',
        year: 2026,
        interests: '运动控制',
        image: '/images/people/wang-jing.jpg',
        links: links('w.j@zju.edu.cn'),
      },
      {
        name: '牟帅龙',
        year: 2026,
        interests: 'Humanoid Robots, Reinforcement Learning',
        image: '/images/people/mou-shuailong.jpg',
        links: links('slmou@zju.edu.cn'),
      },
      {
        name: '汤坤逸',
        year: 2026,
        interests: 'Manipulation, Agents, JEPA',
        image: '/images/people/tang-kunyi.jpg',
        links: links(
          'walavave@gmail.com',
          'https://oionus.github.io/',
          'https://github.com/oionus',
        ),
      },
      {
        name: '穆天',
        year: 2024,
        interests: '人形机器人，感控融合，具身智能',
        image: '/images/people/mu-tian.jpg',
        links: links('tianmuyaonuli@gmail.com'),
      },
    ],
  },
  {
    id: 'master-students',
    title: 'Master Students',
    members: [
      {
        name: '谢东',
        year: 2025,
        interests: 'Humanoid Loco-Manipulation; reinforcement learning',
        image: '/images/people/xie-dong.jpg',
        links: links('seanxd0727@163.com'),
      },
      {
        name: '刘炜',
        year: 2026,
        interests: '人形机器人，强化学习，人机协作',
        image: '/images/people/liu-wei.jpg',
        links: links('mavrick1806@gmail.com'),
      },
      {
        name: '魏大创',
        year: 2024,
        interests: 'Navigation / AI Agent',
        links: links('22460230@zju.edu.cn'),
      },
      {
        name: '龚树培',
        year: 2025,
        interests: 'VLA RL, VLA可解释性，Agent',
        image: '/images/people/gong-shupei.jpg',
        links: links('gongsp@zju.edu.cn', undefined, 'https://github.com/ffifdyop'),
      },
      {
        name: '蒿远',
        year: 2025,
        interests: 'Whole-Body Control, Perceptive Locomotion, Embodied Skill Learning',
        image: '/images/people/hao-yuan.jpg',
        links: links('22532003@zju.edu.cn'),
      },
      {
        name: '王率',
        year: 2025,
        interests: 'Humanoid robot, whole-body control',
        links: links('wshuai@zju.edu.cn'),
      },
      {
        name: '章昊杰',
        year: 2025,
        interests: 'Robotic Manipulation, VLA',
        image: '/images/people/zhang-haojie.jpg',
        links: links('22532038@zju.edu.cn'),
      },
      {
        name: '王艺文',
        year: 2024,
        interests: '人形机器人，强化学习',
        image: '/images/people/wang-yiwen.jpg',
        links: links('22432025@zju.edu.cn'),
      },
      {
        name: '张帅辰',
        year: 2025,
        interests: '人形机器人 VLA',
        image: '/images/people/zhang-shuaichen.jpg',
        links: links('rgzsc246@126.com'),
      },
      {
        name: '张大为',
        year: 2024,
        interests: 'RL, whole-body control',
        links: links('22460226@zju.edu.cn'),
      },
      {
        name: '冯新宇',
        year: 2024,
        interests: '人形机器人全身运动控制',
        links: links('2073432742@qq.com'),
      },
      {
        name: '孙翔',
        year: 2026,
        interests: '运动控制',
        image: '/images/people/sun-xiang.jpg',
        links: links('22632124zju.edu.cn'),
      },
      {
        name: '李欣怡',
        year: 2026,
        interests: '人形机器人运控，感统融合',
        image: '/images/people/li-xinyi.jpg',
        links: links('22632009@zju.cn'),
      },
      {
        name: '荆则通',
        year: 2024,
        interests: 'Perceptive Locomotion，Imitation Learning',
        links: links('jzt22460224@163.com'),
      },
      {
        name: '任哲谞',
        year: 2024,
        interests: '机械臂操作',
        image: '/images/people/ren-zhexu.jpg',
        links: links('545242836@qq.com', undefined, 'https://github.com/rzxmax'),
      },
    ],
  },
];

for (const group of peopleGroups) {
  group.members.sort(
    (left, right) =>
      (left.year ?? Number.POSITIVE_INFINITY) - (right.year ?? Number.POSITIVE_INFINITY),
  );
}

// Former members transcribed from the lab history board in rw/, one column per board column.
export const alumniCohorts: LabAlumniCohort[] = [
  {
    id: 'alumni-column-1',
    members: [
      '李超',
      '贾学超',
      '吕铖杰',
      '雷杰宇',
      '毛翊超',
      '赵逸栋',
      '王春亮',
      '王亚亮',
      '易江',
      '洪伊丽',
      '伍浩贤',
      '李川',
      '吴伟男',
      '王斌鑫',
      '李阳',
      '周坤',
      '余冬冬',
      '金礼森',
    ],
  },
  {
    id: 'alumni-column-2',
    members: [
      '留云',
      '王鹏程',
      '王楚',
      '李奕达',
      '石拓',
      '彭勃',
      '姜朝峰',
      '张有陵',
      'Mustofa',
      '徐静',
      '史继文',
      '袁培正',
      '邹鹏',
      '李庆标',
      '马尊旺',
      '高鹏',
      '赵庆腾',
      '戴梦奇',
    ],
  },
  {
    id: 'alumni-column-3',
    members: [
      '张思涵',
      '黄涛涛',
      '董建树',
      '王裴',
      '许铎',
      '朱一韬',
      '王裕霞',
      '颜超杰',
      '王志成',
      '竺鹏',
      '张家轩',
      '杨太文',
      '李亚飞',
      '李岑芹',
      '乐呈阳',
      '牛锦鹏',
    ],
  },
  {
    id: 'alumni-column-4',
    members: [
      '戴瑞凯',
      '郑一笑',
      '杨超',
      '贾尚斌',
      '申志飞',
      '文宜璋',
      '张亳豪',
      '梁世豪',
      '任坤照',
      '韦婉笛',
      '沈尧杰',
      '罗世鑫',
      '李松波',
      '俞一诺',
      '赵天豪',
    ],
  },
  {
    id: 'alumni-column-5',
    members: ['苏昱行', 
              '胡鄢伟', 
              '张家齐', 
              '孟荻', 
              'XCY', 
              '李培卓'],
  },
];
