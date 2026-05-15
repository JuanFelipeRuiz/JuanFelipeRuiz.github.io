function renderProjectCard(item, linkPrefix) {
  linkPrefix = linkPrefix || '';
  var link = item.link.startsWith('http') ? item.link : linkPrefix + item.link;
  var image = linkPrefix + item.image;

  var tags = (item.tags || []).map(function(tag) {
    return '<span style="display:inline-block; font-size:10px; letter-spacing:1px; text-transform:uppercase; border:1px solid #ccc; padding:2px 7px; margin:2px 2px 0 0; color:#555;">' + tag + '</span>';
  }).join('');

  var typeIcon = item.public_repo
    ? '<a href="' + item.public_repo + '" target="_blank" title="GitHub Repository" style="position:absolute; bottom:10px; right:12px; color:#555; text-decoration:none; font-size:18px;"><i class="icon-github"></i></a>'
    : item.type === 'Beitrag'
      ? '<span title="Beitrag" style="position:absolute; bottom:10px; right:12px; color:#555; font-size:18px;"><i class="icon-pen"></i></span>'
      : '<span title="Kein öffentliches Repository" style="position:absolute; bottom:10px; right:12px; color:#555; font-size:18px;"><i class="icon-lock-closed"></i></span>';

  var readMoreLabel = typeof item.read_more === 'string' ? item.read_more : 'Mehr lesen...';
  var readMore = item.read_more
    ? '<br><a href="' + link + '" style="color:#000; text-decoration:none; font-style:italic; font-size:12px;">' + readMoreLabel + '</a>'
    : '';

  var imgWrapper = item.read_more
    ? '<a href="' + link + '" class="blog-img"><img src="' + image + '" class="img-responsive" alt="' + item.title + '"></a>'
    : '<div class="blog-img" style="cursor:default;"><img src="' + image + '" class="img-responsive" alt="' + item.title + '"></div>';

  return '<div class="blog-entry" style="position:relative;">' +
    imgWrapper +
    '<div class="desc">' +
      '<span><small>' + item.type + '</small></span>' +
      '<h3>' + item.title + '</h3>' +
      '<p>' + item.description + readMore + '</p>' +
      '<div class="tags">' + tags + '</div>' +
    '</div>' +
    typeIcon +
  '</div>';
}

function loadProjects(containerId, options) {
  var opts = options || {};
  var limit = opts.limit || null;
  var linkPrefix = opts.linkPrefix || '';
  var dataPath = opts.dataPath || 'data/projects.json';

  fetch(dataPath)
    .then(function(r) { return r.json(); })
    .then(function(projects) {
      var container = document.getElementById(containerId);
      if (!container) return;

      var items = limit ? projects.slice(0, limit) : projects;
      var html = '';
      var colClass = opts.colClass || 'col-md-4 col-sm-6';

      items.forEach(function(item) {
        html += '<div class="' + colClass + '">' + renderProjectCard(item, linkPrefix) + '</div>';
      });

      container.innerHTML = html;
    });
}
