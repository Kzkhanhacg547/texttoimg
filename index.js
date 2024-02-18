const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');

const app = express();

app.use(express.json());

app.get('/texttoimg', async (req, res) => {
  const prompt = req.query.prompt;

  const form = new FormData();
  form.append('prompt', prompt);

  try {
    
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': 'a66f0040beeb602195366759ea5e222188a3b2b26a675d8d8cba8016a0d8df8d51b6ab3d91f61d25d01a385a70b13f90',
       ...form.getHeaders(),
      },
      body: form,
    });

   if (response.ok) {
      res.setHeader('Content-Type', 'image/png');
      const imageBuffer = await response.buffer();
      res.send(imageBuffer);
    } else {
      res.status(response.status).send('Error from external API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
