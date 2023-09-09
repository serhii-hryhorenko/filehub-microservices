import express from 'express';
import {faker} from '@faker-js/faker';
import bodyParser from 'body-parser';
import formidable from 'formidable';

const app = express();

let folderId = 100;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3001;

const initialRootContent = [
  {
    name: faker.color.human().concat('.pdf'),
    id: '1',
    parentId: '1',
    type: 'file',
    mimetype: 'application/pdf',
    size: 1002034,
  },
  {
    name: 'Amsterdam',
    type: 'folder',
    id: '3',
    parentId: '1',
    itemsAmount: 100,
  },
  {
    name: 'Documents',
    type: 'folder',
    id: '2',
    parentId: '1',
    itemsAmount: 1,
  },
];

let rootFolderContent = initialRootContent.slice();

/**
 *
 * @param items
 * @param root0
 * @param root0.id
 * @param root0.type
 */
function findItem(items, {id, type}) {
  return items.find((item) => item.type === type && item.id === id);
}

app.post('/authenticate', (req, res) => {
  // res.statusCode = 200;
  res.statusCode = 200;
  res.send({
    token: 'dev',
  });
});

app.post('/register', (req, res) => {
  res.statusCode = 200;
  res.send({
    message: 'Congratulations!',
  });
});

app.get('/user', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      name: faker.name.fullName(),
      rootFolderId: 1,
    });
  }, 1000);
});

app.post('/folder/:id', (req, res) => {
  setTimeout(() => {
    const folder = {...req.body, id: ++folderId};
    console.log(folder);
    rootFolderContent.push(folder);
    res.send(folder);
  }, 1500);
});

app.delete('/*/:id', (req, res) => {
  const flag = Math.random() > 0.5;
  setTimeout(() => {
    if (flag) {
      const toRemove = findItem(rootFolderContent, req.body);

      if (toRemove) {
        rootFolderContent.splice(rootFolderContent.indexOf(toRemove), 1);
      }

      if (!rootFolderContent.length) {
        rootFolderContent = initialRootContent.slice();
      }
    }

    res.statusCode = flag ? 200 : 400;
    res.send({message: 'success'});
  }, Math.random() * 3000);
});

app.post('/folder/:id/content', (req, res) => {
  let id = 0;

  setTimeout(() => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (err != null) {
        console.warn(err);
        return res.status(400).json({message: err.message});
      }

      Object.values(files).map((file) => {
        return {
          type: 'file',
          mimetype: file.type,
          name: file.name,
          size: file.size,
          id: 'file - ' + ++id,
          parentId: req.params.id,
        };
      }).forEach((fileItem) => {
        console.log(fileItem);
        rootFolderContent.push(fileItem);
      });

      res.statusCode = 200;
      res.json({message: 'great'});
    });
  }, 1000);
});

app.get('/folder/1', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      id: 1,
      name: 'defaultUserRoot',
      parentId: null,
      itemsAmount: 2,
    });
  }, 300);
});

app.get('/file/:id', (req, res) => {
  console.log('sending a file');
  setTimeout(() => {
    res.statusCode = Math.random() > 0.5 ? 200 : 400;
    res.download('./src/dev/testFile.mp3');
  }, 300);
});

app.get('/folder/1/content', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    console.log(req.query.search);

    if (req.query.search) {
      res.send(rootFolderContent.filter((item) => item.name.toLowerCase().includes(req.query.search.toLowerCase())));
      return;
    }
    res.send(rootFolderContent);
  }, 250);
});

app.get('/folder/2', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      id: 2,
      name: 'Documents',
      parentId: 1,
    });
  }, 200);
});

app.get('/folder/2/content', (req, res) => {
  setTimeout(() => {
    res.send([
      {
        name: 'better_not_look_here.mp4',
        type: 'file',
        parentId: '2',
        mimetype: 'video/mp4',
        size: Math.pow(1024, Math.floor(Math.random() * 4)),
      },
    ]);
  }, 320);
});

app.get('/folder/3', (req, res) => {
  res.statusCode = 200;
  res.send({
    id: 3,
    name: 'Photos',
    parentId: 2,
  });
});

app.get('/folder/3/content', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send([
      {
        name: 'hello.mp3',
        type: 'file',
        parentId: '2',
        mimetype: 'audio',
        size: 1000000000000,
      },
    ]);
  }, 150);
});

app.put('/*/:id', (req, res) => {
  const toEdit = findItem(rootFolderContent, req.body);
  const success = true;

  setTimeout( () => {
    if (success && toEdit) {
      const edited = {...toEdit, ...req.body};
      console.warn(rootFolderContent.indexOf(toEdit));
      rootFolderContent[rootFolderContent.indexOf(toEdit)] = edited;
      console.log(rootFolderContent);
      res.send(edited);
      return;
    }

    res.sendStatus(400);
  }, 500);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started listening on port ${port}`);
});
