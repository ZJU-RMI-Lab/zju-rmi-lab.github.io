# Robotics & Machine Intelligence Lab

浙江大学机器人与机器智能实验室网站，使用 Astro 构建为静态网页。

当前版本：Research 和 Publications 共用3条明确标注的示例论文；Home、People、Media沿用现有展示。正式论文版已单独备份，不包含在此模板仓库的历史中。

## 本地运行

需要 Node.js 24。

```sh
npm ci
npm run dev
```

浏览器访问终端显示的本地地址。发布前检查：

```sh
npm run check
npm run build
npm test
```

## 内容维护

- `src/data/site.ts`：实验室名称、YouTube、GitHub及导航。
- `src/data/publications.ts`：唯一论文数据源。Research根据每篇的`topics`自动归类，Publications按`date`倒序并分年显示。
- `src/data/research.ts`：五个研究方向及简介。
- `src/data/home.ts`：封面视频、照片及News；链接独立于模板论文。
- `src/data/media.ts`：展示视频及其直接论文链接。
- `src/data/people.ts`：导师、学生及校友。
- `src/components/PublicationEntry.astro`：两个论文页面共用的排版与Cite组件。
- `src/styles/global.css`：字体、颜色、间距及响应式样式。

## 替换示例论文

把`status: 'template'`改成`published`、`accepted`或`preprint`，填写真实题名、作者、统一的会议/期刊名、简介和BibTeX。模板中的日期和作者只是排版示例，不表示实验室成果。

`date`用于排序，采用有来源依据的发表日期或arXiv首次公开日期；`year`保留正式题录年份。不要用平台收录日、文件下载日或预印本修订日代替首次公开日期。只有月份时保留`YYYY-MM`精度。

每篇论文最多归入一个`topics`，可取`locomotion`、`navigation`、`manipulation`、`whole-body`、`control`。空数组表示仅在Publications显示。图片放在`public/images/`，填写真实`imageWidth`和`imageHeight`。`paper`、`video`、`code`、`project`为可选链接，尚未确定时省略；示例中的灰色资源标签不可点击。

添加真实论文后，把Publications页面的示例说明改为正式介绍。People中的示例成员也应替换后再作为正式人员名单使用。

## GitHub Pages

推荐创建实验室GitHub组织，并创建同名站点仓库：`<organization>.github.io`，网站地址为`https://<organization>.github.io/`。仓库设为Public，以使用GitHub Free的Pages服务。

1. 将此工程推送到该仓库的`main`分支。
2. 在仓库 Settings → Pages → Build and deployment 中选择 **GitHub Actions**。
3. `.github/workflows/deploy.yml`会在推送到`main`时执行检查、构建、测试并部署；也可以在Actions手动运行。
4. 成功后在Pages设置或Actions运行结果中打开实际网站。

工作流自动从仓库所有者推导站点地址。若使用普通项目仓库，在Repository variables中填写`BASE_PATH=/仓库名`；使用独立域名时填写`SITE_URL=https://你的域名`并将`BASE_PATH=/`。

`PUBLIC_SITE_DRAFT`默认为`true`，保留`noindex, nofollow`，减少模板进入搜索结果。它不限制网页访问。内容定稿后将该Repository variable设为`false`。

未来绑定独立域名不会改变Astro代码和内容维护方式。GitHub组织名称与域名是两个独立的选择。

## 素材

原有视频、照片与标志来源见`docs/ASSET_SOURCES.md`。模板图为明确的占位SVG。`node_modules`、本地运行时、构建结果、缓存及`.env`不上传仓库；安装依赖以`package-lock.json`为准。
