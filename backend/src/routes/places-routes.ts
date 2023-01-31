import  express  from "express";

const router=express.Router();

const DUMMY_PLACES = [
  {
  id: 'p1',
  title: 'Halászbástya',
  description: 'A fortress from the XIX. century.',
  imageUrl: '/halaszbastya.jfif',
  address: 'Budapest, Szentháromság tér, 1014',
  creator: 'u1',
  location: {
    lat: 47.5021827,
    lng: 19.0325925
  }
}
];

export default router.get('/user/:uId',(req,res)=>{
const userId=req.params.uId;
const response=DUMMY_PLACES.find(user=>{
  return user.creator===userId;
});
res.status(200).json(response);
});

router.get('/:pId',(req,res,)=>{
const placeId=req.params.pId;
const response=DUMMY_PLACES.find(place=>{
  return place.id===placeId
});
res.status(200).json(response);
});