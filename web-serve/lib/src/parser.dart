import 'dart:convert';

import 'dart:typed_data';

Map<dynamic, dynamic> _buildMapByFormData(String rawString, String boundary) {
  var rawList = rawString.trim().split("--" + boundary);
  rawList = rawList.sublist(1, rawList.length - 1);

  var nameRe = RegExp(r'([^=]+)="([\w~!@#$%^&*()_\+]+)"[;\s]*');
  var filenameRe = RegExp(r'filename="([\w-_~!@#$%^&*\+()\.]+)"[\s\r\n;]*');
  var conentTypeRe = RegExp(r"Content-Type:[\s*]([\w/\s;]+)[\r\n;]*");
  // var contentDispositionRe = RegExp(r"Content-[\w]+:[\s]*[\w-]+[\s\r\n\t;]*");

  var emptyFirst = RegExp(r"^[\s\t\r\n]*");
  var emptyLast = RegExp(r"[\s\t\r\n]*$");

  var result = Map();
  var filename = null, name = null, conentType = null, files = Map();

  rawList.forEach((raw) {
    var index = raw.indexOf(RegExp(r"\r\n\r\n"));
    var header = raw.substring(0, index);
    var finishValue = raw
        .substring(index)
        .replaceAll(emptyLast, "")
        .replaceAll(emptyFirst, "");

    var nameMatches = nameRe.firstMatch(header);
    var filenameMatches = filenameRe.firstMatch(header);
    var conentTypeMatch = conentTypeRe.firstMatch(header);

    if (filenameMatches != null) {
      filename = filenameMatches[1]!.trim();
      files["fileName"] = filename;
    }
    if (conentTypeMatch != null) {
      conentType = conentTypeMatch[1]!.trim();
      files["conentType"] = conentType;
    }

    if (nameMatches != null) {
      name = nameMatches[2]!.trim();
    }

    if (files.isEmpty) {
      result[name] = finishValue;
    } else {
      BytesBuilder buf = BytesBuilder();
      buf.add(finishValue.codeUnits);
      files["file"] = buf;
      result[name] = files;
    }

    filename = null;
    name = null;
    conentType = null;
    files = Map();
  });

  return result;
}

class Parser {
  static Map json(String rawString) {
    return jsonDecode(rawString);
  }

  static Map form(String rawString) {
    var matches = RegExp(r"([^=&]+)=([\w]+)").allMatches(rawString);
    var mappings = Map();

    for (final m in matches) {
      mappings[m[1]] = m[2];
    }

    return mappings;
  }

  static Map formData(String rawString, String boundary) {
    try {
      return _buildMapByFormData(
        rawString,
        boundary,
      );
    } catch (exx) {
      print("formdata");
      print(exx);
      return Map();
    }
  }
}
