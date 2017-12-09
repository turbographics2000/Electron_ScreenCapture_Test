const desktopCapturer = require('electron').desktopCapturer;

desktopCapturer.getSources({ types: ['screen', 'window', 'tab'] }, (err, sources) => {
    const fragment = document.createDocumentFragment();
    sources.forEach(source => {
        const tile = document.createElement('div');
        const item = document.createElement('div');
        const thumb = document.createElement('div');
        const label = document.createElement('div');
        tile.dataset.sourceId = source.id;
        tile.classList.add('tile');
        item.classList.add('item');
        thumb.classList.add('thumb');
        label.classList.add('label')
        thumb.style.backgroundImage = `url(${URL.createObjectURL(new Blob([source.thumbnail.toPNG()]))})`; // URLが不要になった時点でrevokeObjectURL()すべき
        label.textContent = source.name;
        item.appendChild(thumb);
        item.appendChild(label);
        tile.appendChild(item);
        fragment.appendChild(tile);
        tile.onclick = tileClick;
    });
    selectCaputureContainer.appendChild(fragment);
});

function tileClick(evt) {
    navigator.mediaDevices.getUserMedia({
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: this.dataset.sourceId
            }
        }
    }).then(stream => {
        vid.srcObject = stream;
        selectCaputureContainer.style.display = 'none';
        captureContainer.style.display = '';
    }).catch(err => {
        console.error(err);
    });
}

btnSelect.onclick = evt => {
    selectCaputureContainer.style.display = '';
    captureContainer.style.display = 'none';
}