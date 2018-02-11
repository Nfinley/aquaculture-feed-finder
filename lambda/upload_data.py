import simplejson as json
import es
import uuid
import conf


json_file = 'fish_feed2.json'



if __name__ == '__main__':
    with open(json_file, 'r') as f:
        temp = f.read()

    data_block = json.loads(temp)
    for data in data_block:
        id = str(uuid.uuid4())
        es.post_to_es(data, id)
        print(id)
