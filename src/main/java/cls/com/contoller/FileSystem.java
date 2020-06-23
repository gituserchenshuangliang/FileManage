package cls.com.contoller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;

@RestController
public class FileSystem {
    @RequestMapping("list")
    public String listFiles(String source) {
        HashMap<String, String> map = new HashMap<String, String>(10);
        File file = new File(source);
        if (file.isDirectory()) {
            if (source.length() > 3) {
                map.put("upper", source.substring(0, source.lastIndexOf("\\")));
            } else {
                map.put("upper", source);
            }
            File fs[] = file.listFiles();
            for (File files : fs) {
                map.put(files.getName(), files.getAbsolutePath());
            }
        } else {
            return "download";
        }
        return JSON.toJSONString(map);
    }

    @RequestMapping("down")
    public String down(String fileName, HttpServletResponse response) throws Exception {

        if (new File(fileName).exists()) {
            byte[] file = Files.readAllBytes(Paths.get(fileName));
            response.setContentType("application/octet-stream");
            response.getOutputStream().write(file);
        }
        return "DownLoad !";
    }

    @ExceptionHandler
    public String execptionDo(){
        return "ERROR!";
    }
}
