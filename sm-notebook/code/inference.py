import numpy as np
import torch, os, json, io, cv2, time
from ultralytics import YOLO
from ultralytics.engine.results import Results

def model_fn(model_dir):
    print("Executing model_fn from inference.py ...")
    env = os.environ
    model = YOLO("/opt/ml/model/code/" + env['YOLOV8_MODEL'])
    return model

def input_fn(request_body, request_content_type):
    print("Executing input_fn from inference.py ...")
    if request_content_type:
        jpg_original = np.load(io.BytesIO(request_body), allow_pickle=True)
        jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
        img = cv2.imdecode(jpg_as_np, flags=-1)
    else:
        raise Exception("Unsupported content type: " + request_content_type)
    return img

def predict_fn(input_data, model):
    print("Executing predict_fn11 from inference.py ...")
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    with torch.no_grad():
        try:
            results = model(input_data)       
            detected_objects = []
    #         for box in results.boxes.boxes:
    #             detected_objects.append(results.names.get(box[-1].item()))
    #         print(detected_objects)        
            print(f"Executing predict_fn2 result ...{results}")
            for result in results:
                print(f"Executing predict_fn4 result ...{result}")
                print(f"Executing predict_fn5 result ...{result.names}")    
                
    #         print(f"Executing predict_fn results22 ...{results.xyxy[0].cpu()}")                        
    #         print(f"Executing predict_fn results33 ...{results.xyxy[0].cpu().numpy()}")                        
    #         for res in results.xyxy[0].cpu().numpy():
    #             print(f"Executing output_fn res ...{res}")
    #             # Extract bounding box coordinates, confidence and class ID
    #             xmin, ymin, xmax, ymax, confidence, class_id = res
    #             # Convert class ID to a human-readable class name
    #             class_name = result.names[int(class_id)]

    #             # Print the detection results
    #             print(f'output_fn Class: {class_name}, Confidence: {confidence:.2f}, BBox: [{xmin}, {ymin}, {xmax}, {ymax}]')
        except:
            print (f"exception is {e}")
    return results

def output_fn(prediction_output, content_type):
    print("Executing output_fn from inference.py ...")
    infer = {}
    print(f"Executing output_fn prediction_output111 ...{prediction_output}")
    inter_val = ''
    label_arry = []
    for result in prediction_output:
        print(f"Executing output_fn result.names ...{result.names}")
        # Get all the names that are trained in a dictionary
        result_names = result.names
        if 'boxes' in result._keys and result.boxes is not None:
            results = result.boxes
            print(f"Executing output_fn results11 ...{results}")                        
            infer['boxes'] = result.boxes.numpy().data.tolist()
            inter_val = result.boxes
            print(f"Executing output_fn cls ...{inter_val.cls}")  
            cls_name = inter_val.cls
            for cls in cls_name:
                # Get the label names from the identified items in an array and return it
                label_arry.append(result_names[int(cls)])                                  
        if 'masks' in result._keys and result.masks is not None:
            infer['masks'] = result.masks.numpy().data.tolist()
        if 'keypoints' in result._keys and result.keypoints is not None:
            infer['keypoints'] = result.keypoints.numpy().data.tolist()
        if 'probs' in result._keys and result.probs is not None:
            infer['probs'] = result.probs.numpy().data.tolist()
        print(f"Executing output_fn inter_val ...{inter_val}")    
    return json.dumps(label_arry)