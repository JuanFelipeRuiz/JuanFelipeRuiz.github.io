function renderEducationEntry(item) {
  return '<div class="panel panel-default">' +
    '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
        '<a class="no-toggle" style="cursor:default;">' +
          item.title + (item.period ? '<br><span>' + item.period + '</span>' : '') +
        '</a>' +
      '</h4>' +
    '</div>' +
  '</div>';
}

function loadEducation(containerId) {
  fetch('data/education.json')
    .then(function(r) { return r.json(); })
    .then(function(items) {
      var container = document.getElementById(containerId);
      if (!container) return;
      var html = '<div class="fancy-collapse-panel"><div class="panel-group" id="education-accordion" role="tablist" aria-multiselectable="false">';
      items.forEach(function(item) {
        html += renderEducationEntry(item);
      });
      html += '</div></div>';
      container.innerHTML = html;
    });
}

function loadWork(containerId) {
  fetch('data/work.json')
    .then(function(r) { return r.json(); })
    .then(function(items) {
      var container = document.getElementById(containerId);
      if (!container) return;
      var html = '<div class="fancy-collapse-panel"><div class="panel-group" id="work-accordion" role="tablist" aria-multiselectable="false">';
      items.forEach(function(item) {
        html += renderEducationEntry(item);
      });
      html += '</div></div>';
      container.innerHTML = html;
    });
}
