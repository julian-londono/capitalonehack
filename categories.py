import json, random
with open('categories.json') as json_data:
    data = json.load(json_data)

itemList = {}
# for item in data["categories"]:
#     totalInCategory = len(item["hierarchy"])
#     if (totalInCategory > 1):
#         itemList[item["hierarchy"][totalInCategory-1]] = item["hierarchy"][0]

# with open('categories.json', 'w') as outfile:
#     json.dump(itemList, outfile)
# for x in range(100):
#     print(random.choice(itemList.keys())+ ": $" + str(random.randint(1,101)))
count = 0
for key in data.keys():
    if(data.get(key) == "Service"):
        print (key)
        count += 1
print(count)
