import express from 'express';
import axios from 'axios';
import cors from 'cors';

const LOCAL_END_POINT = '/postcode/search.json';
const POST_CODE_END_POINT = 'https://digitalapi.auspost.com.au/postcode/search.json'

const app = express();
app.use(cors({
  origin: '*'
}));

app.get(LOCAL_END_POINT, function(req, res) {
  let params = {}

  for(const [field, value] of Object.entries(req.query)){
   params[field] = value
  }
  axios.get(POST_CODE_END_POINT, {
    // could move this auth key to environment variable to better hide this.
    headers: {'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8'},
    params: params,
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    res.json(error);
  })
})

app.listen(5000);
