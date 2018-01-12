import json, random, numpy
with open('categories.json') as json_data:
    data = json.load (json_data)

#Used to extract category data
itemList = {"Category": "thing"}
for item in data.keys():
    if data.get(item) not in itemList.keys():
        itemList.update({str(data[item]):[item]})
    else:
        # print(data[item])
        itemList.get(data[item]).append(item)

print(itemList)

with open('sortedcategorydata.json', 'w') as outfile:
    json.dump(itemList, outfile)

#Returns only Services
# for key in data.keys():
#     if(data.get(key) == "Service"):
#         print (key)

# with open('sortedcategorydata.json') as json_data:
#     catdata = json.load(json_data)
# for
# with open('userdata.json') as json_data:
#     userdata = json.load(json_data)
# purchasesJson = []
# for x in range(100):
#     randomPurchase = random.choice(data.keys())
#     purchasesJson.append({"amount": random.randint(1,101),
#                     "category": data.get(randomPurchase),
#                     "type": randomPurchase})
# print(purchasesJson)
# print(userdata)
# userdata["Users"][2]["purchases"] = purchasesJson
# with open('userdata.json', 'w') as outfile:
#     json.dump(userdata, outfile)
