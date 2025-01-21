# 1. query -- GET /graces/search 
```
router.get('/graces/search', validateData(showGraceSchema), gracesController.show);
```
curl -X GET "http://127.0.0.1:3000/graces/search?search=confluent" 
curl -X GET "http://127.0.0.1:3000/graces/search?tags=#kafka,uwu" 
curl -X GET "http://127.0.0.1:3000/graces/search?search=confluent&tags=#kafka" 

# 2. save url -- POST /graces 
```
router.post('/graces', validateData(collectGraceSchema), gracesController.collect);
```
curl -X POST "http://127.0.0.1:3000/graces" \
  -H "Content-Type: application/json" \
  -d '{
    "link": "https://example.com/",
    "description": "Jus a silly link",
    "tags": ["#kafka", "#setup"]
  }'

curl -X POST "http://127.0.0.1:3000/graces" \
  -H "Content-Type: application/json" \
  -d '{
    "link": "https://example.com/"
  }'

curl -X POST "http://127.0.0.1:3000/graces" \
  -H "Content-Type: application/json" \
  -d '{
    "link": "https://example.com/",
    "description": "Jus a silly link"
  }'

curl -X POST "http://127.0.0.1:3000/graces" \
  -H "Content-Type: application/json" \
  -d '{
    "link": "https://example.com/",
    "tags": ["#only", "#tags"]
  }'


# 3. link 2 nodes -- POST /graces/link
```
router.post('/graces/link', validateData(linkGraceSchema), gracesController.link); 
```
curl -X POST "http://127.0.0.1:3000/graces/link" \
  -H "Content-Type: application/json" \
  -d '{
    "from_grace_id": 5,
    "to_grace_id": 6
  }'

curl -X POST "http://127.0.0.1:3000/graces/link" \
  -H "Content-Type: application/json" \
  -d '{
    "from_grace_id": 1,
    "to_grace_id": 10
  }'

# 4. unlink 2 nodes -- DELETE /graces/link
```
router.delete('/graces/link', validateData(linkGraceSchema), gracesController.unlink); 
```
curl -X DELETE "http://127.0.0.1:3000/graces/link" \
  -H "Content-Type: application/json" \
  -d '{
    "from_grace_id": 3,
    "to_grace_id": 4
  }'

# 5. delete node -- DELETE /graces/:id
```
router.delete('/graces/:id', gracesController.delet); 
```
curl -X DELETE "http://127.0.0.1:3000/graces/8"

# 6. enhance grace -- PATCH /graces/:id 
```
router.patch('/graces/:id', validateData(enhanceGraceSchema), gracesController.enhance);
```
curl -X PATCH "http://127.0.0.1:3000/graces/6" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["#example"]}'

curl -X PATCH "http://127.0.0.1:3000/graces/7" \
  -H "Content-Type: application/json" \
  -d '{"description": "Updated description"}'

curl -X PATCH "http://127.0.0.1:3000/graces/8" \
  -H "Content-Type: application/json" \
  -d '{
    "tags": ["#example"], 
    "description": "Updated description"
  }'


# 7. get node info -- GET /graces/:id/connections
```
router.get('/graces/:id/connections', gracesController.getConnections);
```
curl -X GET "http://127.0.0.1:3000/graces/5/connections"